@echo off
set /p webhookUrl=<webhook_url.txt
set /p webhookAuthor=<webhook_author.txt
set /p webhookAuthorImg=<webhook_image.txt
set /p webhookTitle=<webhook_title.txt
set /p webhookDesc=<webhook_description.txt

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST --data "{\"content\": null, \"embeds\": [{\"title\": \"%webhookTitle%\", \"description\": \"%webhookDesc%\",\"color\": 16711680,\"author\": {\"name\": \"%webhookAuthor%\",\"icon_url\": \"%webhookAuthorImg%\"}}],\"attachments\": []}" %webhookUrl%
pause

::firebase deploy