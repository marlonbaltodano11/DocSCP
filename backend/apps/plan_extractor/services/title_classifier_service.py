from huggingface_hub import hf_hub_download
model_class_path = hf_hub_download(repo_id="marlonbaltodano11/syllabus_title_classifier", filename="modeling_syllabus_title_multi_class_classifier.py")
import sys
import os
sys.path.append(os.path.dirname(model_class_path))

import torch
from transformers import DistilBertTokenizer
from modeling_syllabus_title_multi_class_classifier import SyllabusTitleMultiClassClassifier # type: ignore

class TitleClassifierService:
    CLASS_LABELS = [
        "General Information", "Subject Descriptor", "Objectives", "Objectives Per Unit", 
        "Thematic Plan", "Methodological Recommendations", "Analytical Plan", 
        "Necessary Teaching Resources", "Evaluation System", "Bibliography"
    ]
    
    def __init__(self):
        # Setup device
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'

        # Tokenizer and Model
        self.tokenizer = DistilBertTokenizer.from_pretrained("marlonbaltodano11/syllabus_title_classifier")
        self.model = SyllabusTitleMultiClassClassifier.from_pretrained("marlonbaltodano11/syllabus_title_classifier", num_classes=len(self.CLASS_LABELS)).to(self.device)
        
    def _tokenize(self, text: str):
        encoding = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=128,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'],
            'attention_mask': encoding['attention_mask']
        }
    
    def classify_title(self, title: str):
        encoding = self._tokenize(title)
        
        with torch.no_grad():
            input_ids = encoding['input_ids'].to(self.device)
            attention_mask = encoding['attention_mask'].to(self.device)
            
            # Forward pass
            output = self.model(input_ids, attention_mask)
            pred = torch.argmax(output, dim=1)
            
            predicted_class = self.CLASS_LABELS[pred.item()]
            
            return predicted_class