# travel-journey

# git submodule, how it works
Git submodule(Foleon) is a separate repo, Technically connected to Amexgbt.<br />
when you clone the amexgbt repo Foleon sub-module doesnt get cloned.<br />
once the amexgbt repo is cloned you can clone the Foleon repo under amexgbt, if you have toomany repos under submodule(folen) then you can just run **git submodule update --init --recursive** insted of cloing each repo. <br/>
This will be worked by .gitmodules file on the root directry of the amexgbt repo.<br />
below is the url for reference. <br />
https://git-scm.com/book/en/v2/Git-Tools-Submodules
