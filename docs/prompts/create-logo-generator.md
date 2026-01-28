# Generate Logo Via the OpenAI API

make a copy of @src/images/generate-cover.sh and                       
@src/images/generate-cover-openai.py  and call them                    
generate-logo.sh and generate-logo-openai.py.  

Just change the prompt so that a logo is generated.  The new prompt should be:

A minimalist [SUBJECT] logo icon, simple geometric shapes,               
[PRIMARY COLOR] on transparent background, flat design,                
suitable for small size display, professional, clean lines,            
no text, centered composition, square format.  Look for the            
PRIMARY COLOR and ACCENT COLOR in the mkdocs.yml

```yml
theme:                
    name: material
    logo: img/logo.png
    favicon: img/favicon.ico   
    palette:
        primary: 'custom'       
        accent: 'orange'
```