import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import deLocale from 'moment/locale/de';
import appConfig from '../appConfig';
import strings from '../localization';

moment.updateLocale('de', deLocale);
const timeout = 20000;

class ApiHandler {
  constructor() {
    this.apiCaller = axios.create({
      timeout,
    });
  }

  getUnixTimestamp() {
    return moment().unix();
  }

  getISOTimestamp() {
    return moment().toISOString();
  }

  parseTimestampToHumanReadableTime(timestamp) {
    return moment.unix(timestamp).format('DoMM.YY[\n]H:mm:ss');
  }

  apiCall(ms, promise) {
    return Promise.race([
      promise,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('timeout'));
        }, ms);
      }),
    ]);
  }

  async resetPassword(username) {
    return await this.apiCall(timeout, this.apiCaller.request({
      url: `${appConfig.api.baseURL}${appConfig.api.login}${appConfig.api.passwordReset}`,
      method: 'post',
      data: { pers_username: username },
    }));
  }

  async loginUser(username, password) {
    return await this.apiCall(timeout, this.apiCaller.request({
      url: `${appConfig.api.baseURL}${appConfig.api.login}`,
      auth: {
        username,
        password,
      },
    }));
  }

  checkIfJWTIsExpired(jwt) {
    jwt = jwtDecode(jwt);
    // expiration timestamp less than current timestamp in seconds
    return jwt.exp < this.getUnixTimestamp();
  }

  getJWTUsername(jwt) {
    jwt = jwtDecode(jwt);
    return jwt.pers_username;
  }

  async uploadReport(jwt, report) {
    report = this.prepareImagesForUpload(report);
    return await this.apiCall(timeout, this.apiCaller.request({
      url: `${appConfig.api.baseURL}${appConfig.api.reports}`,
      headers: {
        Authorization: jwt,
      },
      method: 'post',
      data: report,
    }));
  }

  async getAllElevators(jwt, url = appConfig.api.baseURL + appConfig.api.elevators, elevators = []) {
    try {
      const response = await this.getElevatorData(jwt, url);
      if (Array.isArray(response.data) && response.data.length != 0) {
        return elevators;
      } else {
        elevators = elevators.concat(response.data._embedded[`${appConfig.api.version}elevators`]);
        if (response.data._links.hasOwnProperty('next')) {
          this.getAllElevators(jwt, response.data._links.next, elevators);
        } else {
          return elevators;
        }
      }
    } catch (error) {
      const errorMessage = error.toString();
      if (errorMessage.includes('status code 401')) {
        return false;
      } else {
        return [];
      }
    }
  }

  getElevatorData(jwt, url = appConfig.api.baseURL + appConfig.api.elevators) {
    return this.apiCall(timeout, this.apiCaller.request({
      url,
      headers: {
        Authorization: jwt,
      },
    }));
  }

  async getAppUserData(jwt, userId) {
    return await this.apiCall(timeout, this.apiCaller.request({
      url: `${appConfig.api.baseURL}${appConfig.api.users}/${userId}`,
      headers: {
        Authorization: jwt,
      },
    }));
  }

  checkIfElevatorIsDue(elevator) {
    if (elevator) {
      const { elev_inspection_days } = elevator;
      if (elevator.elev_last_inspection) {
        const wasLastInspectionToday = moment().isSame(elevator.elev_last_inspection, 'day');
        if (wasLastInspectionToday) {
          return false;
        }
      }
      const dateIndex = elev_inspection_days.findIndex((date) => date == moment().format('DD'));
      const dayIndex = elev_inspection_days.findIndex((day) => day.toLowerCase() == moment().format('dd').toLowerCase());
      return dateIndex >= 0 || dayIndex >= 0;
    }
    return false;
  }

  inspectionDaysToString(inspectionDays) {
    const limit = inspectionDays.length - 1;
    return inspectionDays.map((day, index) => {
      if (/\D{2}/.test(day)) {
        day = `${day[0].toUpperCase()}${day[1]}`;
      }
      if (index < limit) { return `${day}, `; }
      return day;
    });
  }

  _createProperty(propertyKey, propertyValue) {
    return {
      propertyKey,
      propertyValue: (propertyValue !== '') ? propertyValue : '-',
    };
  }

  _setInspector(elevatorInspector, appUser) {
    return {
      inspector: appUser,
      isSubstitue: (elevatorInspector.pers_id != appUser.pers_id),
    };
  }

  addNewReport(elevator, appUser) {
    elevator.status = null;
    elevator.newReport = {};
    elevator.newReport.repo_elevator = {
      elev_id: elevator.elev_id,
      elev_serial_number: elevator.elev_serial_number,
      elev_barcode: elevator.elev_barcode,
      elev_manufacturer: elevator.elev_manufacturer,
      elev_build_year: elevator.elev_build_year,
      elev_location: elevator.elev_location,
      elev_type: elevator.elev_type,
      elev_is_active: elevator.elev_is_active,
      elev_emergency_information: elevator.elev_emergency_information,
      elev_inspection_days: elevator.elev_inspection_days,
    };
    let repo_checkpoints = [];
    try {
      // repo_checkpoints = (elevator.elev_checkpoints == null) ? [...elevator.elev_checklist.chli_checkpoints] : [...elevator.elev_checklist.chli_checkpoints, ...elevator.elev_checkpoints];
      repo_checkpoints = [...elevator.elev_chpoints];
    } catch (e) {
      console.log(e);
      repo_checkpoints = [];
    }
    repo_checkpoints.forEach((checkpoint) => {
      delete checkpoint._links;
      checkpoint.chpo_is_ok = null;
      checkpoint.chpo_annotation = '';
      checkpoint.chpo_images = [];
    });
    elevator.newReport.repo_checkpoints = repo_checkpoints;
    elevator.checkpointsCompleted = 0;
    elevator.checkpointsTotal = repo_checkpoints.length;
    elevator.picturesTaken = 0;
    elevator.picturesLimit = 20;

    const inspector = {
      pers_id: appUser.pers_id,
      pers_firstname: appUser.pers_firstname,
      pers_lastname: appUser.pers_lastname,
      pers_addresses: appUser.pers_addresses,
      pers_email_addresses: appUser.pers_email_addresses,
      pers_phone_numbers: appUser.pers_phone_numbers,
      pers_is_substitute: (elevator.elev_inspector.pers_id != appUser.pers_id),
    };
    elevator.newReport.repo_inspector = inspector;

    elevator.newReport.repo_estate = elevator.elev_estate;
    if (elevator.elev_estate.esta_stakeholders == null) {
      elevator.newReport.repo_estate.esta_stakeholders = [];
    }
    delete elevator.newReport.repo_estate._links;
    return elevator;
  }

  buildFactsheet(elevator) {
    const generalInformation = [];
    const emergencyInformation = [];
    const estateInformation = [];

    generalInformation.push(this._createProperty(strings.dashboard.serialNumber, elevator.elev_serial_number));
    generalInformation.push(this._createProperty(strings.dashboard.barcode, elevator.elev_barcode));
    generalInformation.push(this._createProperty(strings.dashboard.manufacturer, elevator.elev_manufacturer));
    generalInformation.push(this._createProperty(strings.dashboard.location, elevator.elev_location));
    generalInformation.push(this._createProperty(strings.dashboard.type, elevator.elev_type));
    generalInformation.push(this._createProperty(strings.dashboard.dates, this.inspectionDaysToString(elevator.elev_inspection_days)));

    emergencyInformation.push(this._createProperty(strings.dashboard.emergencyEvacuation, elevator.elev_emergency_information.emergency_company));
    emergencyInformation.push(this._createProperty(strings.dashboard.telephoneEmergencyExemption, elevator.elev_emergency_information.emergency_company_phone_number));
    emergencyInformation.push(this._createProperty(strings.dashboard.particularities, elevator.elev_emergency_information.emergency_exit_instructions));
    emergencyInformation.push(this._createProperty(strings.dashboard.emergencyNumber, elevator.elev_emergency_information.emergency_phone_number));

    estateInformation.push(this._createProperty(strings.dashboard.street, `${elevator.elev_estate.esta_address.address_street_name} ${elevator.elev_estate.esta_address.address_street_number}`));
    estateInformation.push(this._createProperty(strings.dashboard.city, `${elevator.elev_estate.esta_address.address_zipcode} ${elevator.elev_estate.esta_address.address_country}`));
    estateInformation.push(this._createProperty(strings.dashboard.caretaker, elevator.elev_estate.esta_facility_manager.facility_manager_name));
    estateInformation.push(this._createProperty(strings.dashboard.phoneNumberCaretaker, elevator.elev_estate.esta_facility_manager.facility_manager_phone_number));
    estateInformation.push(this._createProperty(strings.dashboard.approach, elevator.elev_estate.esta_approach));

    return [{ headline: 'Allgemein', data: generalInformation }, { headline: 'Anwesen', data: estateInformation }, { headline: 'Notfall', data: emergencyInformation }];
  }

  buildElevatorInformation(elevator) {
    const elevatorInformation = [];

    elevatorInformation.push(this._createProperty(strings.dashboard.serialNumber, elevator.elev_serial_number));
    elevatorInformation.push(this._createProperty(strings.dashboard.dates, this.inspectionDaysToString(elevator.elev_inspection_days)));
    elevatorInformation.push(this._createProperty(strings.dashboard.street, `${elevator.elev_estate.esta_address.address_street_name} ${elevator.elev_estate.esta_address.address_street_number}`));
    elevatorInformation.push(this._createProperty(strings.dashboard.city, `${elevator.elev_estate.esta_address.address_zipcode} ${elevator.elev_estate.esta_address.address_city}`));
    elevatorInformation.push(this._createProperty(strings.dashboard.manufacturer, elevator.elev_manufacturer));
    elevatorInformation.push(this._createProperty(strings.dashboard.constructionYear, elevator.elev_build_year));
    elevatorInformation.push(this._createProperty(strings.dashboard.location, elevator.elev_location));
    elevatorInformation.push(this._createProperty(strings.dashboard.type, elevator.elev_type));

    return { elev_id: elevator.elev_id, data: elevatorInformation, status: elevator.status };
  }

  parseHTML(html) {
    return html.replace(/<br\s*\/?>/mg, '\n');
  }

  getSearchString(elevator) {
    elevator = `
		${elevator.elev_barcode} 
		${elevator.elev_serial_number}
		${elevator.elev_manufacturer}
		${elevator.elev_type}
		${elevator.elev_build_year}
		${elevator.elev_location}
		${elevator.elev_estate.esta_address.address_street_name} 
		${elevator.elev_estate.esta_address.address_street_number} 
		${elevator.elev_estate.esta_address.address_zipcode} 
		${elevator.elev_estate.esta_address.address_city} 
		${elevator.elev_estate.esta_address.address_country}
`;
    elevator = elevator.toLowerCase();
    return elevator.replace(/[\n\s]+/gmi, ' ');
  }

  prepareImagesForUpload(report) {
    report.repo_checkpoints.forEach((checkpoint) => {
      checkpoint.chpo_images = checkpoint.chpo_images.map((image) => ({ image_filename: image.name, image_base64: image.base64 }));
    });
    return report;
  }
}

export default new ApiHandler();
