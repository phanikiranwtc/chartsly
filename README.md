![alt text](https://github.com/walkingtree/chartsly/blob/gh-pages/images/chartsly_logo_orange_200.png "Chartsly")
Chartsly
========

Stock Charts package based on Sencha Ext JS &amp; Touch

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
Fork the repository and submit pull requests.

License
-------
[GNU General Public License version 3](http://www.gnu.org/licenses/gpl-3.0.en.html)
