
# make sure pytube is installed, if not install it with "pip install pytube3"
# importing YouTube from pytube
from pytube import YouTube
# asking user to enter link
link = input("Enter the link ")
# showing user that the process has started
print("Downloding...")
# main code to download Video
YouTube(link).streams.first().download()
# showing user that the video has downloaded
print("Video downloaded successfully")