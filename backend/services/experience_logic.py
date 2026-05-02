from typing import List, Dict

class ExperienceCategorizer:
    """
    Logic to categorize resume experience by functional areas.
    This is a mock implementation for now.
    """
    
    FUNCTIONAL_AREAS = {
        "Technical": ["software", "coding", "python", "javascript", "cloud", "aws", "database"],
        "Leadership": ["managed", "led", "team", "directed", "strategy", "oversaw"],
        "Operations": ["process", "logistics", "efficiency", "coordination", "workflow"],
        "Design": ["ui", "ux", "visual", "creative", "figma", "adobe"],
        "Sales/Marketing": ["growth", "revenue", "leads", "campaign", "customer", "marketing"]
    }

    def categorize_experience(self, experiences: List[Dict[str, str]]) -> Dict[str, List[Dict[str, str]]]:
        categorized = {area: [] for area in self.FUNCTIONAL_AREAS}
        categorized["Other"] = []

        for exp in experiences:
            desc = exp.get("description", "").lower()
            found_area = False
            for area, keywords in self.FUNCTIONAL_AREAS.items():
                if any(keyword in desc for keyword in keywords):
                    categorized[area].append(exp)
                    found_area = True
                    break
            
            if not found_area:
                categorized["Other"].append(exp)
        
        return categorized

# Example usage/singleton
categorizer = ExperienceCategorizer()
