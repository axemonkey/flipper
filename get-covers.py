#! /bin/python
# Python > 3.5 required
# https://stackoverflow.com/questions/2212643/python-recursive-folder-read

import os
import glob
import re

root_dir = "./test2/"
input_dir = root_dir + "input/"
# input_dir = "/Volumes/ELARA/iTunes/Music/"
output_dir = root_dir + "output/"

# extract cover.jpg from audio tracks.
# This will only do it once per folder
# And assumes that each album is in its own folder
string = "ffmpeg -n -i '{b1}' -an -c:v copy '{b3}.jpg'"

for filename in glob.iglob(input_dir + '**/**', recursive=True):
       dirname = os.path.dirname(filename)
       bits = dirname.split("/")
       artistbit = bits[-2]
       albumbit = bits[-1]
       # print("b1: " + filename)
       # print("b2: " + dirname)
       # print("b3?: " + root_dir + albumbit)
       # print("artistbit: " + artistbit)
       dirtystring = (artistbit + "-----" + albumbit)
       cleanstring = re.sub(r"[/\\?%*:|\"<>\x7F\x00-\x1F]", "-", dirtystring)
       outstring = output_dir + cleanstring
       # escapefilename = re.escape(filename)
       # escapeoutstring = re.escape(outstring)
       print(string.format(b1=filename,b3=outstring))
       os.system(string.format(b1=filename,b3=outstring))
