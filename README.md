# Lisk Documentation

- [Workflow](#workflow)
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

This section describes general processes that need to be followed when contributing to the lisk-docs codebase.



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
