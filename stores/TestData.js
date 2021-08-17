export default [
{
    "_links": {
        "self": {
            "href": "http://192.168.0.17:3000/elevators/dLGe9YR2OOvfr60NhbDKXXwb2Mi2Md"
        },
        "all": {
            "href": "http://192.168.0.17:3000/elevators"
        }
    },
    "elev_id": "dLGe9YR2OOvfr60NhbDKXXwb2Mi2Md",
    "elev_serial_number": "350554",
    "elev_barcode": "4000AW0090",
    "elev_manufacturer": "Schindler",
    "elev_build_year": "2001",
    "elev_location": "Im Treppenhaus",
    "elev_type": "Personen",
    "elev_is_active": true,
    "elev_emergency_information": {
        "emergency_company": "Schindler",
        "emergency_phone_number": "112",
        "emergency_exit_instructions": "Notöffnung der türen mit Dreikant",
        "emergency_company_phone_number": "0800-8661100"
    },
    "elev_inspection_days": [
        "2",
        "16",
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa",
        "So",
    ],
    "elev_checkpoints": null,
    "elev_checklist": {
        "_links": {
            "self": {
                "href": "http://192.168.0.17:3000/checklists/sWIdXe2s52q0na7DJ7cpHu2iDL1WC1"
            }
        },
        "chli_id": "sWIdXe2s52q0na7DJ7cpHu2iDL1WC1",
        "chli_name": "Standard",
        "chli_checkpoints": [
            {
                "chpo_id": "2OtEXuZN2672j64tFlYYtl9lIzcJ5K",
                "chpo_headline": "ZUGANG ZUM HAUS",
                "chpo_priority": "normal",
                "chpo_description": "Der Zugang zum Haus befindet sich in einem ordnungsgemäßen Zustand.",
                "chpo_long_description": "Sind am Hauszugang irgendwelche Auffälligkeiten? Ist der Zugang gepflegt? Oder liegt z.B. besonders viel Dreck (Zigarettenkippen, Papierfetzen, Verpackungsmüll) herum? Ragen Hecken oder Büsche in den Wegebereich, die dringend geschnitten werden müssten? \t\nIm Winter: Ist ausreichend geräumt (auf einer Breite von 1 m.) und gestreut worden?\nBei Regen: Tropft Wasser von einer überlaufenden Dachrinne oder läuft Wasser an einem Regenfallrohr Aussen herab?\nFalls hier „Mängel“ vorliegen, diese bitte im Textfeld konkret benennen. Überlaufende Dachrinnen und Wasser das Aussen an Regenfallrinnen herunter läuft, weisen auf Verstopfungen der Dachrinnen bzw. Regenfallrohre hin. Das kann man nur bei Regen feststellen.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "lAbIN8HjNvLwJCdp3dF6ZGLBMx6qHt",
                "chpo_headline": "HINWEISE ZUR NOTBEFREIUNG / NOTFALLPLAN",
                "chpo_priority": "normal",
                "chpo_description": "Ist im Bereich der Hauptzugangsstelle zum Aufzug ein Aushang mit den Hinweisen zur Notbefreiung und zur Person mit Zugang zum Aufzugmaschinenraum (nur bei Aufzügen mit Maschinenraum) vorhanden und lesbar? ",
                "chpo_long_description": "Der Aushang kann direkt im Bereich des Aufzugs, aber auch z.B. in einem Schaukasten oder an einem „schwarzen Brett“ in der Nähe des Aufzugs oder des Hauseinganges sein.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "JW05muu8wjhibIKuvDYibmCoHo7oAT",
                "chpo_headline": "AUFZUG FÄHRT NICHT AN, SOLANGE DIE SCHACHTTÜR GEÖFFNET IST\t",
                "chpo_priority": "lebensgefahr",
                "chpo_description": "Geben Sie am Bedientableau einen Fahrbefehl. Prüfen Sie, ob der Aufzug stehen bleibt, wenn Sie die SCHACHTTÜRE aufhalten.",
                "chpo_long_description": "Bitte nicht mit dem Prüfpunkt „Fahrkorb kann nicht anfahren, solange FAHRKORBTÜR geöffnet ist“ verwechseln. Die Fahrkorbtüre ist die Innentüre, die die Kabine von der Schachtwand trennt.\t",
                "chpo_emergency_description": "ACHTUNG: Das ist einer der größten Gefahrenpunkte! Falls der Aufzug losfährt, obwohl die Schachttür nicht vollständig geschlossen ist, müssen Sie SOFORT telefonisch den Aufzugsnotdienst verständigen und den Verwalter/Betreiber sowie den Hausmeister informieren (Rufnummern: siehe Notfallplan). Bitte bleiben Sie vor Ort und stellen Sie sicher, dass niemand durch die Türe in den Aufzugschacht stürzen kann, bis der Notdienst, der Verwalter oder der Hausmeister vor Ort sind und Sie ablösen."
            },
            {
                "chpo_id": "JBuVCK6Q1t5yoHtAELh7qHJN9LS52x",
                "chpo_headline": "FAHRKORBBELEUCHTUNG FUNKTIONIERT",
                "chpo_priority": "wichtig",
                "chpo_description": "Prüfen Sie, ob die Innenbeleuchtung des Fahrkorbs funktioniert. Sind ALLE Lampen intakt? ",
                "chpo_long_description": "Falls einzelne Lampen defekt sind: Bitte „Prüfung weist Mangel auf“ ankreuzen, und angeben, welche bzw. wie viele Lampen defekt sind. Z.B.: „Eine von 4 Lampen defekt“ oder „rechte Lichtleiste defekt“. In manchen alten Aufzügen wurden neue Lampen montiert, ohne dass die „alte“ Lampe (meist eine einfache Neonlampe) entfernt wurde. Wenn die neuen Lampen funktionieren ist die Prüfung ohne Mangel. ",
                "chpo_emergency_description": "Bei Totalausfall der Fahrkorbbeleuchtung muss sofort der Aufzug stillgelegt werden und der Hausverwalter informiert werden."
            },
            {
                "chpo_id": "KY6ZyI98cVHl9P50YZsrp6U5iKa1ii",
                "chpo_headline": "FAHRKORB UNBESCHÄDIGT",
                "chpo_priority": "normal",
                "chpo_description": "Sind Wände, Decke und Boden des Fahrkorbs unbeschädigt? Achten Sie vor allem auf Schäden an Spiegeln und Gläsern und prüfen Sie, ob der Bodenbelag ordnungsgemäß ist und keine Stolperfalle besteht. ",
                "chpo_long_description": "Stolperfallen können z.B. Bodenbeläge sein, die sich an den Kanten aufwölben. Typische gefährdende Beschädigungen sind Schäden an Spiegeln. Bitte tragen Sie gegebenenfalls im Text der Mangelmeldung ein, ob der Spiegel einen oder mehrere Sprünge hat, oder ob bereits einzelne Scherben aus dem Spiegelglas ausbrechen. Wenn Beschädigungen so stark sind, dass von Ihnen eine Verletzungsgefahr ausgeht, muss sofort der Aufzug stillgelegt werden und der Hausverwalter informiert werden.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "cZ3S1qEMaOhYYfus3oCoOfYo3SvQNy",
                "chpo_headline": "(TÜV)-PRÜFPLAKETTE VORHANDEN UND AKTUELL",
                "chpo_priority": "normal",
                "chpo_description": "Im Fahrkorb muss eine Plakette angebracht sein, welche die zuständige Überwachungsstelle (z.B. TÜV oder DEKRA) sowie Monat und Jahr der nächsten Prüfung ausweist. ",
                "chpo_long_description": "Bitte erst als Mangel vermerken, wenn die Prüfung im Vormonat fällig gewesen wäre, nicht wenn der aktuelle Monat genannt wird. Wenn die Prüfung überfällig ist, im Textfeld angeben, wann die nächste Prüfung fällig gewesen wäre (z.B.: Fällig 07-2016).",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "qU8wZ0ZQtZycTz9MGS8xiVjnD2j7U4",
                "chpo_headline": "NOTHALTSCHALTER FUNKTIONIERT",
                "chpo_priority": "normal",
                "chpo_description": "Prüfen Sie während der Fahrt, ob der Nothaltschalter (=Notbremsschalter) funktioniert.",
                "chpo_long_description": "Falls der Aufzug NICHT mit einem Nothaltschalter ausgestattet ist, melden Sie dies bitte der Verwaltung bzw. der aufzugwärter Gmbh, damit dieser Prüfpunkt bei diesem Aufzug entfernt wird.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "FPc15dO57Waul0j4L3HBn0wufufc8Y",
                "chpo_headline": "TÜR-AUF-TASTER FUNKTIONIERT",
                "chpo_priority": "normal",
                "chpo_description": "Prüfen Sie, ob der Tür-Auf-Taster funktioniert, während sich die Türen schließen.",
                "chpo_long_description": "Falls der Aufzug NICHT mit einem Tür-auf-Taster ausgestattet ist, melden Sie dies bitte dem Verwalter bzw. der Aufzugwärter GmbH, damit dieser Prüfpunkt aus der Prüfliste für diesen Aufzug entfernt wird.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "1L1PiSpnoRkL909lIfc5TSSnerCike",
                "chpo_headline": "NOTRUF FUNKTIONIERT",
                "chpo_priority": "wichtig",
                "chpo_description": "Drücken Sie während der Fahrt den Notrufknopf. Prüfen Sie, ob ein Bestätigungsgeräusch vernehmbar ist, dass der Kontakt des Knopfes ausgelöst wurde. ",
                "chpo_long_description": "a) Wenn kein Notruf vorhanden ist, ist das bei Aufzügen, bei denen Personen (mit-) fahren können, IMMER ein Mangel, außer wenn während der gesamten Betriebszeit (Uhrzeiten) des Aufzugs IMMER ein Aufzugwärter im Haus ist, der das Notsignal hört und eine Befreiung durchführen bzw. veranlassen kann.\nb) Die Prüfung ist oft schwer, manchmal unmöglich, wenn der Aufzug über eine sogenannte „Missbrauchserkennung“ verfügt. \nDas bedeutet, dass der Notruf NICHT telefonisch weiter geleitet wird, wenn der Aufzug an einer Haltestelle steht. Wenn der Aufzug einen Nothaltschalter hat, kann man diesen während der Fahrt betätigen und dann testen, ob ein Notruf wirklich von einer Notrufzentrale beantwortet wird. Das Wichtigste ist aber, festzustellen, ob der Drücker funktioniert, denn einen Test, ob die Telefonverbindung funktioniert, macht der Aufzug regelmäßig von sich aus. Für uns genügt es daher, wenn das Funktionieren des Notrufknopfes durch ein Signal oder sonstiges Geräusch bestätigt wird. \nBei Aufzügen, die keinen Notstoppschalter haben, kann man das leider nicht testen. Das Geräusch zeigt zumindest, dass die Taste funktioniert. Bleiben Sie bis max. 30 Sekunden auf der Taste, und warten Sie, ob sich die Notrufzentrale meldet. Das reicht dann aber einmal pro Quartal (Also im Jan, April, Juli + Oktober). Monatlich reicht es, die Tasten kurz zu drücken, um zu testen, ob der Kontakt der Taste funktioniert. der Aufzug über eine Missbrauchserkennung verfügt, kann es sein, dass Sie länger drücken müssen, bis eine Verbindung aufgebaut wird. Unter Umständen kann eine Missbrauchserkennung auch verhindern, dass eine Verbindung aufgebaut wird, wenn der Aufzug an einer Haltestelle steht oder wenn der Aufzug fährt.\t\nWenn eine Verbindung mit der Notrufzentrale erfolgt, teilen Sie mit, dass es sich um eine Kontrolle handelt, und erfragen Sie den Standort des Aufzugs, um zu prüfen, ob der Standort in der Notrufzentrale korrekt hinterlegt ist. Achten Sie darauf, ob die Sprechverbindung ausreichend laut und verständlich ist.",
                "chpo_emergency_description": "Ein funktionierender Notruf ist für den Fall, dass Pesonen aus einem steckengebliebenen Aufzug befreit werden müssen unbedingt erforderlich. Wenn dieser Notruf (Telefonverbindung oder Signalhupe) nicht funktioniert, ist der Aufzug sofort ausser Betrieb zu nehmen, und die Hausvewaltung ist zu informieren."
            },
            {
                "chpo_id": "A9VP1heQIET2kJhIzs79zENjzCa57f",
                "chpo_headline": "HALTEGENAUIGKEIT ÜBERPRÜFEN",
                "chpo_priority": "lebensgefahr",
                "chpo_description": "Fahren Sie jede Etage/Haltestelle an, und überprüfen sie die Haltegenauigkeit. Hält der Aufzug bündig mit dem Boden der jeweiligen Etage? \t",
                "chpo_long_description": "Bei Abweichungen über 1 cm: Wiederholen Sie den Test. \t\nUm die Haltegenauigkeit zu prüfen, kann die Visitenkarte der Aufzugwärter oder ein Meterstab verwendet werden. Wenn hier ein Mangel (=Abweichung von mehr als 1 cm.) festgestellt wird, muss IMMER im Text eingegeben werden, wieviel cm. der Versatz beträgt. (Ab ca. 1,5 cm. wird der Verwalter sofort den Aufzugdienst verständigen, darunter wartet er evtl. die nächste Wartung ab)\t\nDarüber hinaus muss sofort der Aufzug stillgelegt werden und der Hausverwalter informiert werden.",
                "chpo_emergency_description": "Wenn hier ein Mangel (=Abweichung von mehr als 1 cm.) festgestellt wird, muss IMMER im Text eingegeben werden, wieviel cm. der Versatz beträgt. (Ab ca. 1,5 cm. wird der Verwalter sofort den Aufzugdienst verständigen, darunter wartet er evtl. die nächste Wartung ab)\t\nDarüber hinaus muss sofort der Aufzug stillgelegt werden und der Hausverwalter informiert werden."
            },
            {
                "chpo_id": "RO2nbFzqI3Cy29plAoSTRfkO97kJQa",
                "chpo_headline": "WARNSCHILDER FÜR BRANDFALL",
                "chpo_priority": "normal",
                "chpo_description": "Direkt am Aufzug muss bei jeder Haltestelle ein Hinweisschild angebracht sein, dass der Aufzug im Brandfall nicht benutzt werden darf. ",
                "chpo_long_description": "Dies kann entweder als Schild mit reinem Text und/oder auch als bildliche Darstellung ausgeführt sein. Der Text kann variieren und muss nicht wörtlich lauten „Aufzug im Brandfall nicht benutzen“ wie es der meistverbreitete Standard ist. Diese Hinweisschilder müssen an jeder Haltestelle AUSSEN am Aufzug angebracht sein – Innen in der Aufzugkabine ist kein Hinweisschild vorgeschrieben.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "4Xsb8eFE6aTjm5aVPpDy1qZoWYIqdI",
                "chpo_headline": "SCHACHTTÜREN UNBESCHÄDIGT UND ZUGÄNGE FREI ZUGÄNGLICH",
                "chpo_priority": "normal",
                "chpo_description": "Prüfen Sie, ob die Zugänge zum Aufzug in allen Etagen frei zugänglich sind. Ist der Zugang zum Aufzug frei möglich, ohne dass er beengt ist oder vor den Aufzugzugangstüren Stolperfallen bestehen? Prüfen Sie die Schachttüren auf Beschädigungen.",
                "chpo_long_description": "Falls in den Türen Glasscheiben eingesetzt sind, dürfen diese nicht beschädigt sein – auch nicht gesprungen.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "jPxP9cl3FJLZlj9qlReOtNQxbUyc3B",
                "chpo_headline": "SCHACHTTÜREN SIND VERRIEGELT, SOLANGE DER FAHRKORB AUSERHALB DER ENTRIEGELUNGSZONE IST",
                "chpo_priority": "lebensgefahr",
                "chpo_description": "Prüfen Sie an jeder Haltestelle, dass sich die Schachttüren (=die Türen zum Treppenhaus) nicht öffnen lassen, wenn der Aufzug nicht direkt auf dieser Etage steht. ",
                "chpo_long_description": "ACHTUNG: Das ist einer der größten Gefahrenpunkte! Falls sich eine Aussentüre auf einer Etage öffnen lässt, obwohl der Aufzug nicht dahinter steht, müssen Sie SOFORT telefonisch den Aufzugsnotdienst verständigen und den Verwalter/Betreiber sowie den Hausmeister informieren (Rufnummern: siehe Notfallplan). ",
                "chpo_emergency_description": "ACHTUNG: Das ist einer der größten Gefahrenpunkte! Falls sich eine Aussentüre auf einer Etage öffnen lässt, obwohl der Aufzug nicht dahinter steht, müssen Sie SOFORT telefonisch den Aufzugsnotdienst verständigen und den Verwalter/Betreiber sowie den Hausmeister informieren (Rufnummern: siehe Notfallplan). Bitte bleiben Sie vor Ort und stellen Sie sicher, dass niemand durch die Türe in den Aufzugschacht stürzen kann, bis der Notdienst, der Verwalter oder der Hausmeister vor Ort sind und Sie ablösen. Wenn es „nur“ eine (1) Schachttüre betrifft, können Sie den Aufzug zu dieser Haltestelle fahren und dann ausschalten (Über den Hauptschalter im Aufzugmaschinenraum), und müssen dann nicht vor Ort warten. \t\nTragen Sie im Feld „Mängel“ ein, auf welchen Etagen sich die Schachttüren unzulässig öffnen lassen."
            },
            {
                "chpo_id": "g9UAtkyf90Z3zEy3XqJ3AclRLXKP13",
                "chpo_headline": "ZUSTAND DES TREPPENHAUSES",
                "chpo_priority": "normal",
                "chpo_description": "Das Treppenhaus befindet sich in einem ordnungsgemäßen Zustand.",
                "chpo_long_description": "Prüferhinweise: Ist das Treppenhaus ausreichend gepflegt bzw. gereinigt? Hängen Spinnweben an der Decke bzw. in den Ecken? Ist das Treppenhaus durch abgestellte Gegenstände so verstellt, dass seine Funktion als Fluchtweg eingeschränkt wird?\nFalls hier „Mängel“ vorliegen, diese bitte im Textfeld konkret benennen. Das Abstellen von Kinderwägen darf nicht grundsätzlich verboten werden. \t\nEs obliegt jeder Hausgemeinschaft, inwieweit sie das Abstellen von Schuhen und Kinderspielgeräten (wie z.B. Roller) und die Dekoration des Treppenhauses durch Pflanzkübel gestattet. Wir reklamieren nur, wenn die Funktion des Treppenhauses als Fluchtweg eingeschränkt wird, oder wenn bei einzelnen Wohnungen bzw. Etagen erkennbar deutlich mehr abgestellt ist, als in diesem Anwesen dem Anschein nach üblich oder geduldet ist. Wenn das in einem Anwesen mehrfach (3 Mal) gerügt wurde, und sich nicht ändert, muss es nicht mehr gerügt werden.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "FXdw2W8i3b0pm4XukEDoQ5MKcI57j0",
                "chpo_headline": "BESTIMMUNGSGEMÄSSE NUTZUNG DES AUFZUGS",
                "chpo_priority": "normal",
                "chpo_description": "Die Benutzung des Aufzugs erfolgt nach den Vorgaben des Herstellers.",
                "chpo_long_description": "Dieser Punkt ist reichlich allgemein. Hier liegt z.B. ein Mangel vor, wenn deutliche Hinweise auf eine Fehlnutzung erkennbar sind, z.B. wenn ein Personenaufzug von Handwerkern in übermäßiger Weise zum Materialtransport verwendet wird, anstelle dass diese evtl. einen mobilen Aussenaufzug für den Materialtransport in das auszubauende Dache oder die obere Etage verwenden würden.",
                "chpo_emergency_description": ""
            },
            {
                "chpo_id": "1UzySbopp24YknvzwOCf0TPC1Vh6FO",
                "chpo_headline": "SONSTIGES",
                "chpo_priority": "normal",
                "chpo_description": "Hier können Sie eine beliebige Mitteilung an den Hausverwalter eintragen. Dies kann Punkte bezüglich des Aufzugs betreffen, die zu keinem der Prüfpunkte gehören, oder sonstige Hinweise zu Belangen die das Haus oder das Grundstück betreffen.",
                "chpo_long_description": "Hier können sie alle sonstigen Punkte, Probleme oder Mängel auflisten, die Ihnen am und im Haus auffallen. Dies könnte z.B. sein, dass eine Haustüre nicht ordnungsgemäß ins Schloss fällt, dass Sperrmüll im Kellergang abgestellt wurde, etc.",
                "chpo_emergency_description": ""
            }
        ]
    },
    "elev_estate": {
        "_links": {
            "self": {
                "href": "http://192.168.0.17:3000/estates/NAXasXEK83EMJiPQy4ynumD4kStymB"
            }
        },
        "esta_id": "NAXasXEK83EMJiPQy4ynumD4kStymB",
        "esta_address": {
            "address_city": "Herrsching",
            "address_country": "Deutschland",
            "address_zipcode": "82211",
            "address_street_name": "Bahnhofstr.",
            "address_street_number": "20"
        },
        "esta_facility_manager": {
            "facility_manager_name": "Kreuzer Frank",
            "facility_manager_phone_number": "0172-6518814"
        },
        "esta_approach": "Modernes Bürogebäude direkt neben Gemeinde und Feuerwehr. Parkuhr gibt Parkzettel für 30 Minuten kostenfrei aus.",
        "esta_stakeholders": null
    },
    "elev_inspector": [
        {
            "_links": {
                "self": {
                    "href": "http://192.168.0.17:3000/users/Cp294RajInebVBamflYNna2SR9l1vH"
                }
            },
            "pers_id": "Cp294RajInebVBamflYNna2SR9l1vH",
            "pers_scope": "inspector",
            "pers_lastname": "Bohne",
            "pers_addresses": [
                {
                    "address_city": "herrsching",
                    "address_type": "home",
                    "address_country": "Deutschland",
                    "address_zipcode": "82211",
                    "address_street_name": "Rudolf-Hanauer-Str. ",
                    "address_street_number": "1"
                }
            ],
            "pers_firstname": "Bernhard",
            "pers_phone_numbers": [
                {
                    "phone_type": "mobile",
                    "phone_number": "0173-9585605"
                }
            ],
            "pers_email_addresses": [
                {
                    "email_type": "private",
                    "email_address": "b.bohne@verwaltertraining.de",
                    "email_is_receiving": true,
                    "email_notification_time": "9"
                }
            ]
        }
    ],
    "elev_substitute": [
        {
            "_links": {
                "self": {
                    "href": "http://192.168.0.17:3000/users/yN24tut750HTbH4PGBnlnuCSu489f8"
                }
            },
            "pers_id": "yN24tut750HTbH4PGBnlnuCSu489f8",
            "pers_scope": "inspector",
            "pers_lastname": "Wirries",
            "pers_addresses": [
                {
                    "address_city": "Hersching",
                    "address_type": "home",
                    "address_country": "Deutschland",
                    "address_zipcode": "82211",
                    "address_street_name": "Zur Weihersenke",
                    "address_street_number": "21"
                }
            ],
            "pers_firstname": "Klaus",
            "pers_phone_numbers": [
                {
                    "phone_type": "mobile",
                    "phone_number": "0152-54895801"
                }
            ],
            "pers_email_addresses": [
                {
                    "email_type": "work",
                    "email_address": "k.wirries@aufzugwaerter.info",
                    "email_is_receiving": true,
                    "email_notification_time": "7"
                }
            ]
        }
    ],
    "elev_reports": null,
    "elev_creation": "2017-08-11T11:24:42.000Z",
    "elev_last_updated": "2017-08-11T11:24:42.000Z",
    "aclo_owners": [
        {
            "_links": {
                "self": {
                    "href": "http://192.168.0.17:3000/users/Cp294RajInebVBamflYNna2SR9l1vH"
                }
            },
            "aclo_owner": "Cp294RajInebVBamflYNna2SR9l1vH"
        },
        {
            "_links": {
                "self": {
                    "href": "http://192.168.0.17:3000/users/yN24tut750HTbH4PGBnlnuCSu489f8"
                }
            },
            "aclo_owner": "yN24tut750HTbH4PGBnlnuCSu489f8"
        }
    ]
}
]