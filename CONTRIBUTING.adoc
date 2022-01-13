= How to contribute to Lisk Docs
:imagesdir: assets
:toc:

== Feedback

For all kinds of feedback or questions concerning the Lisk documentation, please https://github.com/LiskHQ/lisk-docs/issues[create an issue] inside the `lisk-docs` repository.

To open a new issue, just click on the green `New issue` button:

* Avoid posting redundant issues: Check before, if someone has already opened an issue concerning the topic.
* Choose a self-explaining, clear title
* Use the template `Bug` for errors that you found inside the documentation.
* Use template `Feature` for further ideas how to improve the documentation (e.g. structure changes of content or adding additional content).

image:issue-templates.png[Lisk Docs issue templates]

== Patches

If you discovered a bug in the documentation, e.g. a typo or a broken link, please <<feedback, open a new issue>> or quickly fix it yourself by clicking on the `Edit this Page` button:

image:edit-page.png[Edit page button]

In order to create a PR, you first need to fork `lisk-docs`.
Just click on the green button to do so:

image:fork.png[Fork lisk-docs repo]

This will automatically fork `lisk-docs` and open a new window that allows you to make your intended changes:

image:commit.png[Commit changes]

Finally, hit the `Propose file change` button at the bottom of the page.
This will lead you to the following screen:

image:pull-request.png[Create pull request]

On this page you can verify a last time your proposed changes, before creating a pull request simply by clicking on the green button.

== Solve an open issue

Everyone is welcome to tackle an https://github.com/LiskHQ/lisk-docs/issues[open issue] and create a pull request to solve it.

. *Assign yourself:* If you want to solve an open issue, first assign yourself to the issue.
This way it is visible to other people, that someone is already working on this issue.
. *Fork `lisk-docs`:* To start, you first need to https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository[fork] the `lisk-docs` repository.
. *Create patch branch:* Next, create a new branch based from the branch where you want to make your changes.
When creating the new branch, follow this naming convention:
+
----
ISSUENUMBER-short-description
----
+
Where `ISSUENUMBER` is the number of the issue that you tackled, and `short-description` is a short description of the changes that you did in the PR.
. *Create pull request:* When you made your changes and pushed them to the `lisk-docs` repository`, open an pull request like so:
+
Inside your forked `lisk-docs` repository on Github, click on the `Pull requests` tab.
If you click on `New pull request`, it should automatically pick the `liskhq/lisk-docs` repository as base for the merge.
+
In the description, reference the issue (`#ISSUENUMBER`) that you solved.
. *Submit pull request:* You can now submit the pull request, that's it!
Now the pull request will be reviewed and if it got approved, it will be merged.
