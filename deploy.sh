git config --global user.email ${TYAM_CIRCLECI_EMAIL}
git config --global user.name "tyam@circleci"

git clone https://github.com/tyam/tyam.github.io.git deploy
cd deploy
git checkout master
rm -fr ./*

cp -rp ../icomoon .
cp -rp ../image .
cp -rp ../bundle.js .
cp -rp ../favicon.ico .
cp -rp ../index.html .
cp -rp ../styles.css .
echo "This branch has been generated. See 'hyperapp' branch." >README.md

git add -A
git commit -a -m "update"
git push origin master
