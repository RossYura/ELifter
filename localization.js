
import LocalizedStrings from 'localized-strings';


const strings = new LocalizedStrings({
  en: {
    screens: {
      navigationTabs: {
        home: [
          {
            label: 'TODAYS ELEVATORS!',
            routeName: 'TodaysElevators',
          },
          {
            label: 'ALL ELEVATORS',
            routeName: 'AllElevators',
          },
        ],
        elevator: [
          {
            label: 'FACT SHEET',
            routeName: 'Factsheet',
          },
          {
            label: 'REPORTS',
            routeName: 'Reports',
          },
        ],
        elevatorIsDue: [
          {
            label: 'INSPECTION',
            routeName: 'Inspection',
          },
          {
            label: 'FACT SHEET',
            routeName: 'Factsheet',
          },
          {
            label: 'REPORTS',
            routeName: 'Reports',
          },
        ],
      },
    },
    inputPlaceholders: {
      search: 'Look for elevator',
      annotation: 'Enter error description (optional)',
      loginUsername: 'User name',
      loginPassword: 'Password',
    },
    listHeader: {
      searchResult: 'Found elevators',
      searchRestulEmpty: 'No suitable elevators were found',
      dueElevators: 'Today due elevators',
      dueElevatorsEmpty: 'There are no elevators due today',
      allElevators: 'Your elevators',
      allElevatorsEmpty: 'They were not assigned elevators',
      reportsEmpty: 'There are no reports yet',
      reports: 'Reports',
      reportsDetails: ' (the latest 10)',
      completedCheckpoints: 'Edited checkpoints',
      photoCount: 'Possible photos',
    },
    alerts: {
      checklistDone: {
        title: 'Complete the checklist',
        message: 'Complete all checkpoints.\nDo you want to synchronize the checklist with the server?\n(Internet connection required)',
        cancle: 'Continue the test',
        ok: 'Sync now',
      },
      uploadDisabled: {
        title: 'Checklist incomplete',
        message: 'Not all checkpoints have been completed, so the checklist can not be synchronized with the server.',
        ok: 'Continue the test',
      },
      login: {
        serverTimeout: {
          title: 'Server unavailable',
          message: 'The server could not be reached. Please check your internet connection or try again later.',
        },
        noUsername: {
          title: 'No username specified',
          message: 'Please enter your username.',
        },
        noPassword: {
          title: 'No password specified',
          message: 'Please enter your password.',
        },
        allEmpty: {
          title: 'No username and password entered',
          message: 'Please enter your username and password.',
        },
        wrongUsername: {
          title: 'Wrong user name',
          message: 'The entered username could not be found.',
        },
        wrongPassword: {
          title: 'Wrong password',
          message: 'The entered password is incorrect.',
        },
        logoutWarning: {
          title: 'Do you really want to log out?',
          message: 'You are about to log out. You can only log in again with an active internet connection.',
        },
        loginDisclaimer: 'By logging in to this app you agree that the data collected by you will be used by GmbH and Branch.io SDK. More information can be found under: https://www.aufzugwaerter.info/datenschutz',
      },
      wrongReportUploadScope: {
        title: 'Save not possible',
        message: 'You do not have permission to save report.',
      },
      uploadError: {
        title: 'Save not possible',
        message: 'An error occurred while uploading to the server, please contact the server admin.',
      },
      undefinedError: {
        title: 'Unexpected error - please send a screenshot to the administrator',
      },
      imageViewer: {
        deleteImage: {
          title: 'Delete picture',
          message: 'Do you want to delete the photo irretrievably?',
          cancle: 'Cancele',
          ok: 'OK',
        },
      },
      inspectionCardPictures: {
        title: 'Recording not possible',
        message: 'You will not be able to take new photos because you have already reached the limit of possible images. \n Delete image if you wont to take new photos.',
      },
    },
    elevatorDueInspectionButton: {
      default: {
        text: 'Start the test',
        icon: 'clipboard_empty',
      },
      inProgress: {
        text: 'Continue the test',
        icon: 'clipboard_text',
      },
      done: {
        text: 'Complete the test',
        icon: 'clipboard_check',
      },
    },
    login: {
      loginPasswordReset: 'Please enter your username. \n A new password will be created and sent to your e-mail address.',
      restorePasswordButton: 'Restore password',
      loginFormButton: 'Login',
      passwordResetFormButton: 'Restore password',
    },
    loader: {
      login: 'You are logged in',
      elevators: 'Lifts are being loaded',
      reportUpload: 'Report is uploaded',
      resetPassword: 'Password is created',
    },
    sync: {
      default: 'Loading',
    },
    imageViewer: {
      deleteButton: 'Clear',
    },
    dashboard: {
      serialNumber: 'Serial Number',
      barcode: 'Barcode',
      manufacturer: 'Manufacturer',
      location: 'Location',
      type: 'Type',
      dates: 'Inspection days',
      emergencyEvacuation: 'Emergency evacuation',
      telephoneEmergencyExemption: 'Telephone emergency exemption',
      particularities: 'Particularities',
      emergencyNumber: 'Emergency Number',
      street: 'Street',
      city: 'City',
      caretaker: 'Caretaker',
      phoneNumberCaretaker: 'Phone Number Caretaker',
      approach: 'Approach',
      generally: 'Generally',
      estate: 'Estate',
      emergency: 'Emergency',
      constructionYear: 'Construction year',
    },
  },


  de: {
    screens: {
      navigationTabs: {
        home: [
          {
            label: 'F??LLIGE AUFZ??GE!',
            routeName: 'TodaysElevators',
          },
          {
            label: 'ALLE AUFZ??GE',
            routeName: 'AllElevators',
          },
        ],
        elevator: [
          {
            label: 'DATENBLATT',
            routeName: 'Factsheet',
          },
          {
            label: 'PROTOKOLLE',
            routeName: 'Reports',
          },
        ],
        elevatorIsDue: [
          {
            label: 'PR??FUNG',
            routeName: 'Inspection',
          },
          {
            label: 'DATENBLATT',
            routeName: 'Factsheet',
          },
          {
            label: 'PROTOKOLLE',
            routeName: 'Reports',
          },
        ],
      },
    },
    inputPlaceholders: {
      search: 'Aufzug suchen',
      annotation: 'Fehlerbeschreibung eintragen (optional)',
      loginUsername: 'Benutzername',
      loginPassword: 'Passwort',
    },
    listHeader: {
      searchResult: 'Gefundene Aufz??ge',
      searchRestulEmpty: 'Es wurden keine passenden Aufz??ge gefunden',
      dueElevators: 'Heute f??llige Aufz??ge',
      dueElevatorsEmpty: 'Es sind heute keine Aufz??ge f??llig',
      allElevators: 'Ihre Aufz??ge',
      allElevatorsEmpty: 'Ihnen wurden keine Aufz??ge zugewiesen',
      reportsEmpty: 'Es liegen noch keine Protokolle vor',
      reports: 'Protokolle',
      reportsDetails: ' (max. die zehn neusten)',
      completedCheckpoints: 'Bearbeitete Pr??fpunkte',
      photoCount: 'M??gliche Fotos',
    },
    alerts: {
      checklistDone: {
        title: 'Pr??fliste abschlie??en',
        message: 'Alle Pr??fpunkte ausgef??llt.\nSoll die Pr??fliste mit dem Server synchronisiert werden?\n(Internetverbindung erforderlich)',
        cancle: 'Pr??fung fortsetzen',
        ok: 'Jetzt synchronisieren',
      },
      uploadDisabled: {
        title: 'Pr??fliste unvollst??nding',
        message: 'Es wurden noch nicht alle Pr??fpunkte ausgef??llt, daher kann die Pr??fliste nicht mit dem Server synchronisiert werden.',
        ok: 'Pr??fung fortsetzen',
      },
      login: {
        serverTimeout: {
          title: 'Server nicht erreichbar',
          message: 'Der Server konnte nicht erreicht werden. Bitte ??berpr??fen Sie Ihre Internetverbindung oder probieren Sie es ggf. zu einem sp??tern Zeitpunkt erneut.',
        },
        noUsername: {
          title: 'Kein Benutzername angegeben',
          message: 'Bitte geben Sie Ihren Benutzernamen ein.',
        },
        noPassword: {
          title: 'Kein Passwort angegeben',
          message: 'Bitte geben Sie Ihren Passwort ein.',
        },
        allEmpty: {
          title: 'Kein Benutzername und Passwort eingegeben',
          message: 'Bitte geben Sie Ihren Benutzernamen und Ihr Passwort ein.',
        },
        wrongUsername: {
          title: 'Falscher Benutzernamen',
          message: 'Der eingegebene Benutzernamen konnte nicht gefunden werden.',
        },
        wrongPassword: {
          title: 'Falsches Passwort',
          message: 'Das eingegebene Passwort ist nicht korrekt.',
        },
        logoutWarning: {
          title: 'M??chten Sie sich wirklich ausloggen?',
          message: 'Sie sind im Begriff sich ausloggen. Sie k??nnen sich nur mit aktiver Internetverbindung wieder mit der einloggen.',
        },
        loginDisclaimer: 'Mit dem Einloggen in diese App stimmen Sie der Verwendung der durch Sie erhobenen Daten durch die Aufzugw??rter GmbH sowie der Nutzung des Branch.io SDK zu. Mehr Informationen dazu finden Sie unter: https://www.aufzugwaerter.info/datenschutz',
      },
      wrongReportUploadScope: {
        title: 'Speichern nicht m??glich',
        message: 'Sie haben nicht die Berechtigung Protokolle zu speichern.',
      },
      uploadError: {
        title: 'Speichern nicht m??glich',
        message: 'Es kam beim Upload zu einem Fehler auf dem Server, bitte kontaktieren Sie den Server-Admin.',
      },
      undefinedError: {
        title: 'Unerwarter Fehler - bitte schicken Sie einen Screenshot an den Administrator',
      },
      imageViewer: {
        deleteImage: {
          title: 'Foto l??schen',
          message: 'M??chten Sie das Foto unwiederbringlich l??schen?',
          cancle: 'Abbrechen',
          ok: 'L??schen',
        },
      },
      inspectionCardPictures: {
        title: 'Aufnahme nicht m??glich',
        message: 'Sie k??nnen keine neuen Fotos mehr aufnehmen, da Sie das Limit an m??glichen Bildern bereits erreicht haben.\nL??schen Sie ggf. Bilder, um neue Fotos aufzunehmen.',
      },
    },
    elevatorDueInspectionButton: {
      default: {
        text: 'Pr??fung starten',
        icon: 'clipboard_empty',
      },
      inProgress: {
        text: 'Pr??fung fortsetzen',
        icon: 'clipboard_text',
      },
      done: {
        text: 'Pr??fung abschlie??en',
        icon: 'clipboard_check',
      },
    },
    login: {
      loginPasswordReset: 'Bitte geben Sie Ihren Benutzernamen ein.\nEs wird ein neues Passwort erstellt und an Ihre E-Mail-Adresse(n) versand.',
      restorePasswordButton: 'Passwort Wiederherstellen',
      loginFormButton: 'Login',
      passwordResetFormButton: 'Passwort wiederherstellen',
    },
    loader: {
      login: 'Sie werden eingloggt',
      elevators: 'Aufz??ge werden geladen',
      reportUpload: 'Protokoll wird hochgeladen',
      resetPassword: 'Passwort wird erstellt',
    },
    sync: {
      default: 'wird\ngeladen',
    },
    imageViewer: {
      deleteButton: 'L??schen',
    },
    dashboard: {
      serialNumber: 'Seriennummer',
      barcode: 'Barcode',
      manufacturer: 'Hersteller',
      location: 'Standort',
      type: 'Typ',
      dates: 'Pr??ftage',
      emergencyEvacuation: 'Notbefreiung',
      telephoneEmergencyExemption: 'Telefonnummer Notbefreiung',
      particularities: 'Besonderheiten',
      emergencyNumber: 'Notfallnummer',
      street: 'Stra??e',
      city: 'Ort',
      caretaker: 'Hausmeister',
      phoneNumberCaretaker: 'Telefonnummer Hausmeister',
      approach: 'Anfahrt',
      generally: 'Allgemein',
      estate: 'Anwesen',
      emergency: 'Notfall',
      constructionYear: 'Baujahr',
    },
  },
});

// strings.setLanguage('de');
strings.setLanguage('en');

export default strings;
