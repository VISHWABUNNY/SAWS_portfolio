import os
import subprocess
import tempfile

gallery_dir = '/home/vishwa/Desktop/SAWS/frontend/public/gallery'

# Find all mp4 files larger than 2MB
large_videos = []
for root, dirs, files in os.walk(gallery_dir):
    for file in files:
        if file.lower().endswith('.mp4'):
            filepath = os.path.join(root, file)
            size_mb = os.path.getsize(filepath) / (1024 * 1024)
            if size_mb > 2.0:
                large_videos.append((filepath, size_mb))

print(f"Found {len(large_videos)} videos to optimize.")

for filepath, size in large_videos:
    print(f"Optimizing: {os.path.basename(filepath)} ({size:.2f} MB)")
    
    # Create temp output file
    temp_dir = tempfile.gettempdir()
    temp_output = os.path.join(temp_dir, 'optimized_' + os.path.basename(filepath))
    
    # Run ffmpeg
    cmd = [
        'ffmpeg', '-y', '-i', filepath,
        '-vcodec', 'libx264',
        '-crf', '30',
        '-preset', 'fast',
        '-acodec', 'aac',
        '-b:a', '64k',
        '-movflags', '+faststart', # optimizes for web streaming/fast playback start
        temp_output
    ]
    
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        new_size = os.path.getsize(temp_output) / (1024 * 1024)
        savings = (1 - (new_size / size)) * 100
        print(f"  -> Done. New size: {new_size:.2f} MB ({savings:.1f}% savings)")
        
        # Overwrite original
        os.replace(temp_output, filepath)
    except subprocess.CalledProcessError as e:
        print(f"  -> Error optimizing {filepath}: {e}")

print("Media optimization complete!")
