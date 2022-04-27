import os

print("""
\x1b[38;2;255;20;147m╦╔═ ╔═╗ ╦═╗ ╔╦╗ ╔═╗
\x1b[38;2;255;20;147m╠╩╗ ╠═╣ ╠╦╝ ║║║ ╠═╣
\x1b[38;2;255;20;147m╩ ╩ ╩ ╩ ╩╚═ ╩ ╩ ╩ ╩\x1b[38;2;0;255;58m>(setup)
""") 

print("""[0] pip\n[1] pip3\nWhich one do you use?""")

c = input(">>>: ")
if c == "0":
    os.system("pip install cloudscraper")
    os.system("pip install socks")
    os.system("pip install pysocks")
    os.system("pip install colorama")
    os.system("pip install undetected_chromedriver")
    os.system("pip install httpx")

elif c == "1":
    os.system("pip3 install cloudscraper")
    os.system("pip3 install socks")
    os.system("pip3 install pysocks")
    os.system("pip3 install colorama")
    os.system("pip3 install undetected_chromedriver")
    os.system("pip3 install httpx")
if os.name == "nt":
    pass
else:
    os.system("wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb")
    os.system("apt-get install ./google-chrome-stable_current_amd64.deb")

print("Done.")
