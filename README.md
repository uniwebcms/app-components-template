# Uniweb App Components Template

This repository is a template to start creating **UI component collections** for your own [Uniweb](https://uniwebcms.com) instances. The [component development documentation](https://help.uniweb.app/) explains the programming framework, which is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack](https://webpack.js.org/).

:stopwatch: It should take about 5 minutes to get started building and testing a component collection using this repository. You do not need to install any tools. All you need is a free [Cloudflare Pages](https://pages.cloudflare.com) project and administration permissions on a Uniweb instance. It is also possible to build and test your component collections locally.

## Setting up a distribution server

The building process can be done remotely or on a local computer. With a remote build, you can work entirely online by editing your code with the [GitHub code editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) and then letting Cloudflare build a distribution bundle every time you commit changes to a selected branch. With local builds, Cloudflare is used only as a content delivery network for the distribution bundle.

### Setup step 1: Create a Cloudflare project

The first step is to configure a **free Cloudflare project** that can be used for both building and distribution, or just for distribution.

Start by [creating a Cloudflare Pages project](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/cloudflare_setup.md) and then connecting your repository to it. If you want, you can configure your Cloudflare project to run a new build command whenever a particular branch changes. The build command is:

```bash
yarn build
```

Configure the Cloudflare Pages project as shown below.

![img.png](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/assets/cloudflare/simpleBuildSetting.png)

The **target collection** of the build is defined in the environment variable `TARGET_COLLECTION` located in the `.env` file of this repository. The default value is `AppComponents`. You can edit the `.env` file and set a new value for it, or you can manage its value directly in your Cloudflare project, which has higher precedence that the one in `.env`.

Every time you commit to your main branch, a production build will be executed automatically.

> Cloudflare lets you [skip a build](https://developers.cloudflare.com/pages/platform/branch-build-controls/#skip-builds) by adding `[CI Skip]` to the commit message.

If you prefer building your distribution locally, simply leave the _Build command_ blank. Then you can commit your builds in the dist folder, or you can use [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) to push the files to Cloudflare without committing them to the repository.

### Setup step 2: Link your component collection to a Uniweb instance

A component collection can be linked to a Uniweb instance used for production or testing.

Here we assume that you have access to a [Uniweb instance](https://help.uniweb.app/uniweb_instance). You will configure your Uniweb instance to request your choice of **component collection**.

Link a component collection to thedesignated app docufiolio as its **default styler**. 

Before linking a component collection to a docufolio and/or to a website, you must create [component collection profile](help.uniweb.app/creating_a_widget_collection_profile) for it with basic information about its distribution URL, description, and optional links to its documentation and source code.

In a docufolio, open its settings and choose the desired collection profile in the **Styler** field.

## Programming components

You can edit the files in this repository with a local editor or with the online [GitHub code editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor). To edit files online, simply type <kbd>.</kbd> at any page of the repository on the GitHub website.

> The github.dev editor runs entirely in your browser’s sandbox. Your work is saved in the browser’s local storage until you commit it.

If this is your first collection, you can get started quickly by duplicating the example collection included in the repository. To do that, simply go to the `src` folder and follow these steps:

1. Duplicate the `AppComponents` to keep a copy of it.
1. Name the new copy `ExampleCollection`.
1. Work directly on the `AppComponents`.

After editing the files in the repository, remember to commit the changes so that Cloudflare starts a new build process. The steps are as follows:

1. Go to the Source Control tab on the left panel, type a message and then click the _Commit & Push_ button.
2. Go to the Source Control tab on the left panel, and [commit your changes](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#commit-your-changes).
3. Once the Cloudflare build process is complete, you can see the results by reloading your Uniweb.

## Building collections locally

Letting Cloudflare build your collection is a good option for repositories that only have one collection in them as, for now, you cannot connect one GitHub repository to multiple Cloudflare Pages projects. For repositories with multiple collections, you have to build them locally, and use Cloudflare for distribution only. Building locally is also faster, but requires you to have Yarn installed.

Whenever possible, we recommend local builds for production and [public tunneling to localhost](#developing-with-a-localhost-tunnel) for development. For the scenario where you want the flexibility of updating app components without a computer, e.g. with your phone, using online tools for editing and building is the ideal choice. Online building is also good to get your first project started with minimal effort.

The most common setup is having a `master` branch and a `develop` branch and configuring Cloudflare to distribute the `dist` folder in the `master` branch. With that branch structure, the frequent commits are done on the `develop` branch, which is only merged into the `master` branch to make a new version publicly available.

### Publishing new bundles

Remote building is a good option to distribute production bundle of a single component collection. However, local building is better for frequent development and/or repositories with multiple component collections.

> You can use local building for production, development or both. To disable remote building, go to your Cloudflare project and remove the build command from it.

In local building mode, you use Yarn to build the output bundle. You can target both production and development modes. For production, you first build and then commit the distribution bundle to the git repository. Cloudflare will pick up the change and start the public distribution of the new bundle.

Make sure that the [Yarn package manager](https://yarnpkg.com/) is installed and run the basic `yarn` script at the root of the repository to install all the dependencies.

```bash
yarn
```

Before building, make sure that the `TARGET_COLLECTION` environment variable is set with the name of the collection that you want to build. You can write the setting in `.env` if you want to commit the change, or in `.env.dev` if you want to be ignored in the commit (ideal when working with other team members working on different collections).

You can build and commit a new distribution bundle by running the `build:prod-commit` action.

```bash
yarn build:prod-commit
```

> You can also set the `TARGET_COLLECTION` in the build command using this syntax: `TARGET_COLLECTION=[some_name] yarn build:prod-commit`

### Developing with a localhost tunnel

For development environments, we recommend working with a public tunnel to your localhost URL instead of committing your dev builds. With that setup, you don't have to commit the changes in order for them to go live. You simply make changes to the code in your file system, and then let Yarn rebuild it automatically. You just have to reload the Uniweb app linked to the collection whenever you want to see the results of your changes.

> The latest version build of your code is available to the site via the public tunnel that you opened.

Follow the [instructions on working with a public tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/localhost_tunnel.md) to set up a tunnel and develop locally with it.

## How to create a new Component Collection

1. Create a folder under `src` with the name of the new **component collection**. e.g. `src/AltComponents`.

2. Create a `index.js` file and export all necessary components that the app may need in that file. For example, [src/AltComponents/index.js](./src/AltComponents/index.js)

3. Set `TARGET_COLLECTION=AltComponents` in `.env` (for prod), `.env.dev` (for dev), or in your Cloudflare project.

## Choosing between Tailwind and Twind for component CSS

[Tailwind](https://tailwindcss.com/) is a CSS framework based on atomic utility classes. Tailwind classes are found and defined at build time and distributed as standard CSS. In contrast, [Twind](https://twind.dev/) is a tailwind-in-js CSS framework that defines the Tailwind utility classes at runtime when they are needed.

Uniweb components support both approaches when building a component collection. However, when building App components for a Uniweb instance, the only valid option at this time is to use Twind.

