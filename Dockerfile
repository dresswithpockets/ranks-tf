# base image contains .NET Core SDK, nodejs, bower, gulp
FROM microsoft/aspnetcore-build AS build-env
WORKDIR /app

COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish --output /app/ --configuration Release

FROM microsoft/aspnetcore
WORKDIR /app
COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "aspnetapp.dll"]