import json
import tempfile
import os
from django.http import JsonResponse, FileResponse
from django.views import View
from apps.syllabus_generator.services.syllabus_template_service import SyllabusTemplateService
from apps.syllabus_generator.serializers import CamelCaseJSONSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from time import sleep

@method_decorator(csrf_exempt, name='dispatch')
class ExportSyllabusView(View):
    def post(self, request, *args, **kwargs):
        # Verificar si se ha enviado la data en el cuerpo de la solicitud
        if not request.body:
            return JsonResponse({'error': 'No data provided'}, status=400)

        try:
            # Decodificar los datos JSON enviados en el cuerpo de la solicitud
            data = json.loads(request.body)

            # Usar el serializador para convertir las llaves de camelCase a snake_case
            data_in_snake_case = CamelCaseJSONSerializer.detransform(data)

            # Instanciar el servicio para llenar la plantilla del syllabus
            syllabus_template = SyllabusTemplateService(data_in_snake_case)
            syllabus_template.fill_document_template()

            # Crear un archivo temporal para guardar el documento
            with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as temp_file:
                temp_file_path = temp_file.name
                syllabus_template.save(temp_file_path)

            # Enviar el archivo como respuesta
            doc_file = open(temp_file_path, 'rb')
            response = FileResponse(
                doc_file,
                content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
            response['Content-Disposition'] = 'attachment; filename="syllabus_output.docx"'

            return response

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
