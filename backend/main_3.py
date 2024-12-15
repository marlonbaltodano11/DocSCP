from apps.syllabus_generator.services.syllabus_template_service import SyllabusTemplateService

if __name__ == "__main__":

    data = data = {
        "checkboxes": {
            "{{modality}}": "",
            "{{academic_regime}}": "",
            "{{credits}}": '',
            "{{weekly_frequency}}": '',
        },
        "{{signature_name}}": "",
        "{{signature_code}}": "",
        "{{career_year}}": "",
        "{{total_hours}}": "",
        "{{career}}": "",
        "{{teacher_fullname}}": "",
        "{{delivery_date}}": "",
        "{{update_date}}": "",
        "{{approved_date}}": "",
        "{{timetable}}": "",
        "{{approved_by}}": "",
        "{{subject_objective}}": "",
        "{{methodological_recommendations}}": "",
        "{{evaluation_method}}": "",
        "microplanning_table": [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "Examen aqui por favor"],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
        ],
        "{{schedule_description}}": "",
        "schedule_table": {
            "first_partial": [
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
            ],
            "second_partial": [
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
            ]
        },
        "{{bibliography}}": "",
    }

    
    syllabus_template = SyllabusTemplateService(data)
    
    syllabus_template.fill_document_template()
    
    syllabus_template.save('output.docx')