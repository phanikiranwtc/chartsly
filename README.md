![alt text](https://github.com/walkingtree/chartsly/blob/gh-pages/images/chartsly_logo_orange_200.png "Chartsly")
Chartsly
========

[![Join the chat at https://gitter.im/walkingtree/chartsly](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/walkingtree/chartsly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Stock Charts package based on Sencha Ext JS &amp; Touch

Resources
---------
* [Website](http://walkingtree.github.io/chartsly/)
* [Demo](http://chartslyuat.walkingtree.in/)

Getting Started
---------------

1. Clone the repository by running the followig command:
  ```
  git clone https://github.com/walkingtree/chartsly.git
  ```
2. Go inside the working folder where you have cloned the repo, say, `chartsly`
3. Change directory to `extjs-kitchensink` directroy in chartsly using Terminal or Command. This folder contains the Ext JS version of **Chartsly Kitchen Sink** application
4. Build the Kitchen Sink application by running the following command
  ```
  sencha app build
  ```
The deployable artefacts are located under `ext-kitchensink/build/production/KS` folder.
5. Copy `extjs-kitchensink/build/production/KS` folder and its content to your Web Server's document root folder (e.g. htdocs/www/..)
6. Access `http://localhost[:port]/KS/` in your browser and you shall see the Kitchen Sink application showing **Indicators**, **Overlays**, **Interactions**, and **Events**, as shown below:

  ![alt text](https://github.com/walkingtree/chartsly/blob/master/chartsly_screen.png "Chartsly Kitchen Sink")


Want to contribute?
-------------------
[Fork](https://github.com/walkingtree/chartsly#fork-destination-box) the repository and submit pull requests.

License
-------
[GNU General Public License version 3](http://www.gnu.org/licenses/gpl-3.0.en.html)
