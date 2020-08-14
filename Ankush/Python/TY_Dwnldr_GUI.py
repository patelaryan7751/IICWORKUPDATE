from tkinter import *
#make sure pytube is installed, if not install it with the commands "pip install pytube3"
from pytube import YouTube

root = Tk()
root.geometry("400x350")
root.title("YouTube Video downloader")

def download():
    try:
        myVar.set("Downloading...")
        root.update()
        YouTube(link.get()).streams.first().download()
        link.set("Download Successful!!")
    except Exception as e:
        myVar.set("Mistake")
        root.update()
        link.set("Enter Correct Link")

Label(root, text="YouTube Downloader", font="Consolas 15 bold").pack()
myVar = StringVar()
myVar.set("Enter the link here")
Entry(root, textvariable=myVar, width=40).pack(pady=10)
link=StringVar()
Entry(root, textvariable=link, width=40).pack(pady=10)
Button(root, text="Download Video", command=download).pack()
root.mainloop()