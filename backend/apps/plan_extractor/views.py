import os
from django.http import JsonResponse
from django.views import View
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from apps.plan_extractor.services.plan_extractor_service import PlanExtractorService
from apps.plan_extractor.services.plan_cleaner_service import PlanCleanerService
from services.document_io_service import DocumentIOService
from apps.plan_extractor.serializers import CamelCaseJSONSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class ParseLessonPlanView(View):
    def post(self, request, *args, **kwargs):
        # Verificar si se ha subido un archivo
        if 'planFile' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        plan_file = request.FILES['planFile']

        try:
            # Guardar el archivo subido en el sistema de almacenamiento predeterminado
            temp_file_path = default_storage.save(plan_file.name, ContentFile(plan_file.read()))
            temp_file_path = os.path.join('uploads', temp_file_path)

            doc_io_service = DocumentIOService(temp_file_path)
            doc = doc_io_service.get_document()

            # Procesar el documento
            plan_extractor = PlanExtractorService(doc)
            plan_cleaner = PlanCleanerService()

            sections = plan_extractor.get_sections()
            cleaned_plan = plan_cleaner.get_cleaned_plan(sections)

            # Eliminar el archivo temporal después del procesamiento
            if default_storage.exists(temp_file_path):
                pass
                #default_storage.delete(temp_file_path)

            if not isinstance(cleaned_plan, (dict, list)):
                return JsonResponse({'error': 'Unexpected data structure'}, status=500)
            
            data_in_camel_case = CamelCaseJSONSerializer.transform(cleaned_plan)
            
            return JsonResponse(data_in_camel_case, status=200)

        except Exception as e:
            # Eliminar el archivo temporal en caso de error
            if 'temp_file_path' in locals() and default_storage.exists(temp_file_path):
                pass 
                #default_storage.delete(temp_file_path)
            return JsonResponse({'error': str(e)}, status=500)
