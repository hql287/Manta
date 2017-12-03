<p align="center">
  <img src="https://d26dzxoao6i3hh.cloudfront.net/items/0p043p3z2r2C2T2B2B0I/manta-logo.svg" alt="Manta App Logo" width="180" height="auto"/>
</p>

<h2>
  Manta
  <a href="https://travis-ci.com/hql287/Manta">
    <img src="https://travis-ci.com/hql287/Manta.svg?token=pxxHGwHnxpjzt5yFJEav&branch=dev" alt="Build Status">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="v1.0.0">
  </a>
  <a href="./License.md">
    <img src="https://img.shields.io/npm/l/slate.svg?maxAge=300">
  </a>
</h2>

A desktop application for creating invoices with beautiful and customizable templates.

<a href="#features">Features</a> •
<a href="#downloads">Downloads</a> •
<a href="#techs">Techs</a> •
<a href="#why">Why?</a> •
<a href="#goals">Goals</a> •
<a href="#development">Development</a> •
<a href="#support">Support</a>

### Features
* 🎚 Flexible form. You can turn on/off fields
* 🏗 Drag & drop for reordering items. This makes editing easier.
* 📐 Use SVGs for logo for better printing.
* 🎨 2 Custom designed & highly customizable templates. Will add more in future versions.
* 📊 Export PDF for print or email.
* 🔒 Privacy. Your data stays where it belongs.
* 💯 Totally Free.

### Downloads

Operating System | Tested
-----------------|-------
<a href='https://github.com/hql287/Manta/releases/download/v1.0.0/Manta-1.0.0.dmg'>Download for macOS</a> | ✅  Yes
<a href="#">Download for Windows</a> | <a href="#support">No. See support</a>
<a href="#">Download for Linux</a> | <a href="#support">No. See support</a>


### Techs
* [Electron](https://github.com/electron/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [React-DnD](https://github.com/react-dnd/react-dnd)
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [React-Motion](https://github.com/chenglou/react-motion)
* [Webpack](https://github.com/webpack/webpack)

### Why
The main reason I decided to build this is because I need a simple tool to create good looking invoices, estimates, and receipts but couldn't find a product that suits my needs. I don't do invoicing for a living but I do need it occasionally so an ideal invoicing app just need to be good at one thing and one thing only, which is making invoices. I really don't need a full-fledged bookkeeping or accounting software.

I believe there are many people such as freelance designers, developers, photographers or writers... also have such need. Sadly, I did my research and most (if not all) products that I found have these these problems:

**Complexity**

* Most invoicing products nowadays is web-based, which means you’ll need to maintain a new account (possible a monthly fee, too) just to create an invoice.
* Sure, there some open-source products that can be self-hosted, but that will introduce a new layer of complexity to your workflow. Who will setup the product? Who will maintain the server? Who will cover the cost? ...
* You will always need internet connection to be able to create your invoices. It can be slow sometimes.

**Privacy**

* When you use a web service, most of the time, you’re giving away your data whether you want it or not. Financial data is sensitive and I believe that no one should know about your data except yourself.



### Goals
With that in mind, I know that Manta would need to satisfy these criteria:

* 🚀 Fast!!!
* 👍 Friendly UI & UX
* 🎉 Has nice looking templates
* 🔒 Does not touch user’s data
* 💰 Free! :)

This is still in beta and it's far from perfect but I hope it did meet those requirements.



### Development

It's very easy to get started with these 3 steps:

* Clone this project to your local machine.
* Run `yarn dev` in one tab to start `webpack-dev-server`.
* Run `yarn start` in another tab to open the electron app.

Feedbacks, issues or PRs are greatly appreciated! :)

### Support

Manta has been tested only on macOS as I don't have any machine runs Windows/Linux. Future versions might include support for Windows if this project receives enough traction. In the meantime, if you find a bug, please file an issue.
