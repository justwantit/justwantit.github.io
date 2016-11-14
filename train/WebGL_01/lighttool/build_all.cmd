cd babylonjs
call tsc
cd ..

cd filepool
call tsc
cd ..

cd htmlui
call tsc
copy panel.css ..\htmlui\lt_htmlui.css
cd ..


cd jsloader
call tsc
cd ..

pause
