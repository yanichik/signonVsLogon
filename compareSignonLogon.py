import json

def read_json_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f'Error reading JSON from file {file_path}: {e}')
        return None

def compare_json_files(file1, file2):
    obj1 = read_json_from_file(file1)
    obj2 = read_json_from_file(file2)
    if not obj1 or not obj2:
        return None
    return compare_objects(obj1, obj2)

def compare_objects(obj1, obj2):
    delta = {}
    for key in obj1:
        if key not in obj2:
            delta[key] = obj1[key]
        elif json.dumps(obj1[key]) != json.dumps(obj2[key]):
            if isinstance(obj1[key], dict) and isinstance(obj2[key], dict):
                delta[key] = compare_objects(obj1[key], obj2[key])
            else:
                delta[key] = obj1[key]
    for key in obj2:
        if key not in obj1:
            delta[key] = obj2[key]
    return delta

file1 = 'file1.json'
file2 = 'file2.json'

delta = compare_json_files(file1, file2)

print(delta)
