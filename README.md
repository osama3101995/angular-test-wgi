
# nextjs-test-innoscripta

**Introduction**
An Angular / .Net Web Core API Project that makes use of the following libraries and APIs:

- scss
- auth0
- sqlserver



**Run Locally**

1. Open the directory of the repo
2. Go to 'frontend/src/environments' and create copy of `environment.example.ts` and rename it to `environment.ts` 
3. Open the file, and update the API secrets.
4. Go back to the repo directory, then go to 'wgi-api\wgi-api' and create copy of `appsettings.example.json` and rename it to `appsettings.json`
5. Open the file and update the API secrets as well.
6. Open the ASP project by opening the `wgi-api.sln` which is in wg-api folder of repo directory.
7. You need to have MSSQL installed and running. 
8. Press `Ctrl+F5` to start the project.
9. To start frontend, go in the frontend folder in repo directory, open cmd, and type `npm serve` or you could create a build