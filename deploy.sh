git config --global user.email "tyam001@gmail.com"
git config --global user.name "Tetsuo Yamada"

git clone https://github.com/tyam/tyam.github.io.git deploy
cd deploy
git checkout deploytest
rm -fr ./*

cp -rp ../icomoon .
cp -rp ../image .
cp -rp ../bundle.js .
cp -rp ../favicon.ico .
cp -rp ../index.html .
cp -rp ../styles.css .

git add -A
git commit -a -m "update"
git push origin deploytest
