@echo off
:: OLD VARIABLE THAT WAS USED AS ONE LINE
::set /p webhookUrl=<webhook_url.txt
set /p webhookAuthor=<webhook_author.txt
set /p webhookAuthorImg=<webhook_image.txt
set /p webhookTitle=<webhook_title.txt
set /p webhookDesc=<webhook_description.txt

for /F "tokens=*" %%W in (webhook_url.txt) do (
    curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST --data "{\"content\": null, \"embeds\": [{\"title\": \"%webhookTitle%\", \"description\": \"%webhookDesc%\",\"color\": 16711680,\"author\": {\"name\": \"%webhookAuthor%\",\"icon_url\": \"%webhookAuthorImg%\"}}],\"attachments\": []}" %%W
)
:: OLD CURL COMMAND THAT ONLY SUPPORTS A SINGLE URL
::curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST --data "{\"content\": null, \"embeds\": [{\"title\": \"%webhookTitle%\", \"description\": \"%webhookDesc%\",\"color\": 16711680,\"author\": {\"name\": \"%webhookAuthor%\",\"icon_url\": \"%webhookAuthorImg%\"}}],\"attachments\": []}" %webhookUrl%

firebase deploy

pause