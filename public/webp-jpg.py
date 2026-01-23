from PIL import Image
import os

for filename in os.listdir('.'):
    if filename.lower().endswith('.webp'):
        img = Image.open(filename)
        jpg_name = os.path.splitext(filename)[0] + '.jpg'
        img.convert('RGB').save(jpg_name, 'JPEG')
        print(f'转换完成: {filename} -> {jpg_name}')