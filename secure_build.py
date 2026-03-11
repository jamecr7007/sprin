import base64
import random
import string

def obfuscate(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        code = f.read()

    # สเต็ป 1: แปลงโค้ดเป็น Base64
    b64_code = base64.b64encode(code.encode('utf-8')).decode('utf-8')
    
    # สเต็ป 2: สร้างฟังก์ชันหลอก (Dummy) มาครอบ
    dummy_name = ''.join(random.choices(string.ascii_letters, k=8))
    final_code = f"var {dummy_name} = '{b64_code}'; eval(atob({dummy_name}));"

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_code)
    print(f"--- [Success] Obfuscated {input_file} to {output_file} ---")

if __name__ == "__main__":
    obfuscate('script.js', 'script.min.js')
