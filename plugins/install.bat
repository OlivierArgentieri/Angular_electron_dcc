@echo off

:: --- CP TO MAYA DIRECTORY --
:: maya path structure '/Documents/maya/YEARS'

:: ask maya version to user
SET /P _years="Enter version of Maya : "
SET _cpto=%USERPROFILE%\Documents\maya\%_years%
SET _mayaModPath=%CD%\maya
XCOPY %_mayaModPath% %_cpto% /E /H /Y


 
:: --- CP TO HOUDINI DIRECTORY --
:: houdini path structure '/Documents/houdiniVERSION'
SET /P _version="Enter version of Houdini (example: 18.0) : "
SET _cpto=%USERPROFILE%\Documents\houdini%_version%
SET _mayaModPath=%CD%\houdini 
XCOPY %_mayaModPath% %_cpto% /E /H /Y 



