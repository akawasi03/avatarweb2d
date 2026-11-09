import json

transcript_path = r'C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/.system_generated/logs/transcript.jsonl'
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        if obj.get('type') == 'USER_INPUT':
            print(f"Step {obj.get('step_index')}: {len(obj.get('media', []))} media items")
            for m in obj.get('media', []):
                print(f"  {m.get('uri')}")
