from apps.plan_extractor.services.plan_extractor_service import PlanExtractorService
from apps.plan_extractor.services.plan_cleaner_service import PlanCleanerService
from services.document_io_service import DocumentIOService
from pprint import pprint
from docx.text.paragraph import Paragraph
from model_data.table import Table

if __name__ == "__main__":
    
    doc_io_service = DocumentIOService(f'./class_plans/plan.docx') #Archivo subido por el usuario usando esta api 
    doc = doc_io_service.get_document()
    #print(doc._element.xml)
    plan_extractor = PlanExtractorService(doc)
    plan_cleaner = PlanCleanerService()
    sections = plan_extractor.get_sections()
    cleaned_plan = plan_cleaner.get_cleaned_plan(sections) #respuesta de la api
        