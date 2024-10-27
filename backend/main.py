from apps.document_generator.services.syllabus_template_service import SyllabusTemplateService

if __name__ == "__main__":
    
    data = {
        "checkboxes": {
            "{{modality}}": "in-person",
            "{{academic_regime}}": "quarter",
            "{{credits}}": '2',
            "{{weekly_frequency}}": '2',
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
        ],
        "{{schedule_description}}": "",
        "schedule_table": {
            "first_partial": [
                ["", "", "", "", "", ""],
            ],
            "second_partial": [
                ["", "", "", "", "", ""],
            ]
        },
        "{{bibliography}}": "",
    }
    
    syllabus_template = SyllabusTemplateService(data)
    
    syllabus_template.fill_document_template()
    
    syllabus_template.save('output.docx')