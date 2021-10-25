import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

const location = gcp.config.region || "us-central1";
const project = "cafe-baileys-331214";

const backend = "cafe-baileys-backend";
const webapp = "cafe-baileys-webapp";
const backendImage = new docker.Image(backend, {
  imageName: pulumi.interpolate`gcr.io/${project}/${backend}:v0.0.2`,
  build: {
    context: "../backend",
    dockerfile: "../backend/Dockerfile",
  },
});
const webappImage = new docker.Image(webapp, {
  imageName: pulumi.interpolate`gcr.io/${project}/${webapp}:v0.0.1`,
  build: {
    context: "../front-end",
    dockerfile: "../front-end/Dockerfile",
  },
});

const backendService = new gcp.cloudrun.Service("backend", {
  location,
  project: project,
  template: {
    spec: {
      containers: [
        {
          image: backendImage.imageName,
          ports: [{ containerPort: 8000 }],
          resources: {
            limits: {
              memory: "1Gi",
            },
          },
        },
      ],
      containerConcurrency: 50,
      serviceAccountName:
        "admin-21@cafe-baileys-331214.iam.gserviceaccount.com",
    },
  },
});

const webappService = new gcp.cloudrun.Service("webapp-2", {
  location,
  project: project,
  template: {
    spec: {
      containers: [
        {
          image: webappImage.imageName,
          ports: [{ containerPort: 8001 }],
          resources: {
            limits: {
              memory: "1Gi",
            },
          },
        },
      ],
      containerConcurrency: 50,
      serviceAccountName:
        "admin-21@cafe-baileys-331214.iam.gserviceaccount.com",
    },
  },
});

new gcp.cloudrun.IamMember("backend-everyone", {
  location,
  service: backendService.name,
  project: project,
  role: "roles/run.invoker",
  member: "allUsers",
});

new gcp.cloudrun.IamMember("webapp-everyone", {
  location,
  service: webappService.name,
  project: project,
  role: "roles/run.invoker",
  member: "allUsers",
});

// Export the URL
export const backendUrl = backendService.statuses[0].url;
export const webappUrl = webappService.statuses[0].url;
