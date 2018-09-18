# trendminer
Code from the Trendminder project I did for CURENT Spring 2017

This project came in several parts:

First, mine the data and then run sentiment analysis on it with Python.
The sentiment analysis was just me using a Python library: TextBlob. It returns a value between -1 and 1 when called on a string. The more positive the value, the more positive the sentiment.

<h3> What is inside </h3>

<p>Each trend that we were analyzing was split into a different directory.</p>

<ul><li><b>can</b>: Contains the code used to analyze and visualize the number of candidate mentions over time.</li>
    <li><b>cat</b>: Contains the code used to analyze and visualize how many tweets were coming from various sources (Twitter, Fox News, etc..) over time.</li>
    <li><b>key</b>: Contains the code used to analyze and visualize the frequency of keywords appearing in media over time.</li>
    <li><b>med</b>: Contains the code used to analyze and visualize the sentiment towards the candidates in media over time.</li>
    <li><b>talk</b>: Contains the code used to analyze and visualize the coverage of topics by each candidate in media over time.</li>
    <li><b>top</b>: Contains the code used to analyze and visualize the sentiment towards the coverage of topics by each candidate in media over time.</li></ul>
    
<p><b> Each directory contains the same few files. </b></p>

<ol><li>A Python program that does the analysis by pulling data from /export3/duggan/social/2015 (and 2016) (These directories should be on one of the three machines (ex: accona)</li>
<li>A JSON file produced from running the Python code that contains the formatted data that will be graphed in the Javascript program</li>
  <li>An HTML file that is used to display the graphs produced by the Javascript program</li>
  <li> A <b>js</b> directory that contains two Javascript programs. The first one, main.js, takes the JSON file and graphs it on the webpage linked below. The second one, menu.js, contains some code used to make the green navigation button and drop down list.</li>
  <li> A <b>css</b> directory that contains two css files. The first one, style.css, is used to style the graphs and pie charts displayed on the page linked below, The second one, menu.css, is used to style the green navigation menu and drop down list.</li>
  <li>Additionally, the top level directory contains an index.html file, and a css and js file that are used to create the main menu</li>
  </ol>
  
  <b>Note:</b> The <b>med</b> directory contains one additional Python program <i>parse.py</i> which is used to take the results from the JSON file and plot them into a histogram. This histogram is saved as a .png file. It can be run using <i>python parse.py</i>
  
<h3>How to run</h3>
<p>Just go into any directory and run a python program. For example, to run <i>candidates.py</i>, just type <i>python candidates.py</i>. It should produce a JSON file that can be used by main.js to create the graphs that will be hosted on the page linked below.</p> 
  


<p><h3><a href="http://seelab.eecs.utk.edu/trendminer">Follow this link to see the graphs.</a></h3></p>

