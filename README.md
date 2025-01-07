# Vet Store

## Getting Started

Thank you for taking the time to know my work. To continue you'll see this simple and easy backend application about a Vet Store (CRUD actions). I'll continue building This project because I haven't finished it. But I hope it can be useful for you.

## Description
This frontend Angular Application privide different typical components/sections in any CRUD project.
You can use a previous version of this project running in the following link: https://mxgpetidwebappangularflo-c032a.web.app/

## Features

* **Pets Operations**: Provide CRUD operations to work with user cases about Pets domain.
    * Search a product by identificator.
* **Product Operations**:  Provide CRUD operations to work with user cases about Product domain.
    * Get list of products.
* **Account Operations**:  Provide CRUD operations to work with user cases about Account domain.
    * Authenticate user (Sign-In), using its own domain.
    * Register new users (Sign-Up), using its own domain.
    * Refresh Tokens from a expired token, using its own domain.

### Screenshoots

![2025-05-03_19-08-26](https://github.com/user-attachments/assets/a60c9704-a5f9-4039-a76c-934223c6f421)

![2025-05-03_19-08-45](https://github.com/user-attachments/assets/0e04e8aa-1101-413f-b3e2-2340d4677361)

![2025-05-03_19-08-54](https://github.com/user-attachments/assets/f0c59704-8163-488c-bd90-9b7a3ca59310)

![2025-05-03_19-08-39](https://github.com/user-attachments/assets/86c5ef28-88f6-4e50-8494-847d7b8768dc)

## Other Features
* **Encrypt in database user sensible information**:  Sensible and personal information are encrypted as Name, Birthdate, etc. With this action avoid to shared or use maliciously the private information of evryone.

## Tecnhologies Used
* **Angular**: This project was built using Angular CLI version 19.0.1.
* **Node**: This project was built using 22.11.0 version.
* **Tailwind**: This project use Tailwind framework to works with design.
* **Blowbite**: This projects works over Tailwind CSS but using also Blowbite components.
* **Typescript**: It's the main language to build the project.
* **Signals**: This project implement the new style to relay notifications.
* **Standalone**: This project works in standalone mode, doesn't use the common way to manage modules.
* **Guards**: Different sections are protected for guard validations using the claims in the token.
* **Interceptors**: Interceptors to handle or manipulate the authentication (JWT).
* **i18n**: This project handles multilanguage applied to user interfaces in runtime.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


All rights reserved. This repository is shared for demonstration purposes only. Redistribution or use of this code in any form is not permitted without explicit permission from the author.
