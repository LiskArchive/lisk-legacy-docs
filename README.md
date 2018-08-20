# Lisk Documentation

- [Workflow](#workflow)
  - [Adding new content](#adding-new-content)
  - [Releasing new versions](#releasing-new-versions)
- [Style Guidelines](#style-guidelines)
  - [Writing in Markdown](#writing-in-markdown)
    - [Headings](#headings)
    - [Cross-reference Links](#cross-reference-links)
    - [Images](#images)
  - [Document structure](#document-structure)
    - [Introduction page](#introduction-page)
    - [Structuring content](#structuring-content)
  - [Notes](#notes)
  
## Workflow

This section describes general processes that need to be followed when contributing to the `lisk-docs` codebase.

Each product has its own **development branch**, `dev-{product}`. 
This development branches are a subtree of the `lisk-docs` repository,
which contain only the relevant documentation files of the respective product.
These branches contain the latest changes in the documentation of the product,
e.g. documentation for unreleased software versions.

For each new version of the product, that needs updates / changes in the documentation,
a corresponding Milestone and Branch will be created. 

E.g. For Lisk Core version 1.1.0 
- the Milestone would be: `Core 1.1.0`
- the **version branch** would be: `dev-core-1-1-0`

The master branch always contains the official state of the Lisk documentation, which should be identical with content in https://docs.lisk.io

New issues must be labeled after Product, and should be added to a Milestone.

### Adding new content

1. **Create an issue:** If the corresponding issue for the content you want to add does not exist yet,
please create the issue first.
Remember to specify Labels and Milestone for the issue, as much as you can.
2. Before working on an issue, **make sure the issue is assigned to you.**
3. **Clone** the `lisk-docs` repository from github: `git clone git@github.com:LiskHQ/lisk-docs.git`
(in case you haven't done that already).
4. Check out the branch you want to write documentation for: `git checkout dev-{product}-{version}`
or **pull latest changes** : `git pull origin dev-{product}-{version}`
Be sure `{version}` matches the version mentioned in the corresponding issue.
5. Check out a new branch from the version branch which will contain all the changes to solve the issue you are working on.
**Name the branch** in this pattern: `123-description-of-the-branch`, where `123` is the issue number of the issue you are trying to solve.
6. Make your changes as intended, commit them and **push it back to github**: `git push origin 123-description-of-the-branch`
7. On github, create a PR as usual: Reference the issue it solves, and add a short summary of the made changes.

### Releasing new Versions

When all issues that belong to a Milestone are closed, the current version branch is merged into the development branch.

The development branch is then tagged with the corresponding version number.

At release date of the new version, all new content from the `dev-` branches is merged into the `master` branch.

The master branch gets a new tag each time new content from the `dev`-branches is merged.
The tag is simple date format, so e.g. new content got merged into `master` at february the 15th 2018, the tag for master would be `lisk-docs-2018-02-15`

## Style Guidelines

To keep the documentation experience intuitive and consistent for the user,
each products' documentation needs to follow the common Style Guidelines for Lisk Documentation.

Please read it carefully and use it as a checklist before and after every participation.

### Writing in Markdown

The whole documentation content is purely written in Markdown.
 
For reference: [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

#### Headings

Headings create automatically internal anchors that can be referenced in other parts of the documentation.
Use Headings to structure the content of each page.

```
# Main title

## Section 1

### Subsection

## Section 2

[...]
```

#### Cross-reference links



Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | The cross-reference links can be easily broken. Remember this section when removing or adding pages, sections or headings.

##### When to use references
- In Table of content
- Inside of the content. Scan content for helpful cross-references

##### How to create references

Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | Use internal / relative links instead of external links where possible.

```
[Link to Section 1](#section-1)
[Link to another docs page](path/to/page.md)
[Link to other Website](https://nodejs.org/en/)

[...]

## Section 1
```

#### Images

Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | Only include images, if they are informative for the user.

If you want to include a picture on a page, upload the image in the same folder and use a relative link to the image.

Image name should be: `lisk_PRODUCT-DEFINITION`. Optionally and depending on how the documentation grows, another tag can be added as section ending in `lisk_PRODUCT-SECTION-DEFINITION`

Example:
```
![alt text for lisk logo](lisk_protocol-Logo.svg "Logo Title Text")
```
 
### Document structure

When to use new pages, sub pages or sections for new content.

#### Introduction page

On root level of each products documentation you find an introduction page for the respective product.
This page is always required.

An introduction page should have at least the following sections:

1. **Table of content:** The introduction should start with a table of content whith relative links to all 
other existing documentation sites for the respective product.
2. **Product description:** Try to describe the product precisely in 1-2 sentences.
Then, elaborate about the general purpose of the product, e.g. highlight use cases and top features.
3. **Codebase reference:** Link to the github repository of the product, and reference contribution guidelines.

#### Structuring content

The following list gives some suggestions how to structure the content:

1. **Parent pages:** A page that contains one or more child pages.
It should always start with a table of content, referencing all existing child pages.
2. **Child pages:** If content is connected, but can stand independent from each other.
3. **Section in page:** Content that is closely connected to the content of the other sections/ the main title of the page.

### Notes

If certain content needs to be highlighted or deserves special attention from the reader, use notes as described below.

Level | Color | Use Case
--- | --- | --- 
Info | blue | For informative notes that need attention.
Warning | orange | For important notes and warnings.
Success | green | E.g. for outlining supported platforms.
Error | red | E.g. for not supported platforms

Example:
```
Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | Only include images, if they are informative for the user.
```
