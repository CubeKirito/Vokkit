@echo off
title Vokkit v0.0.1
:main
cls

echo.
echo �Ȧ�����������������������������������������������������������
echo ��
echo ��    Vokkit v0.0.1
echo ��
echo ��
echo ��   1. Start Server
echo ��
echo ��   2. Go to Github
echo ��
echo ��   3. Quit
echo ��
echo ��
echo ��  Created by Scripter36(1350adwx)
echo ��
echo �Ʀ�����������������������������������������������������������

set /p a=Choose: 
if %a%==1 goto startServer
if %a%==2 goto github
if %a%==3 goto quit
cls
goto main

:startServer
cls
node index.js
cls
goto main

:github
cls
explorer https://github.com/Vokkit/Vokkit
goto main

:quit
cls
