export GOOGLE_CREDENTIALS=$(cat service-account.json)

# Login
./login.sh

# Your GCLOUD Project ID
gcloud config set project cafe-baileys-331214

# Configure docker with your new project
gcloud auth configure-docker

# Login with docker
cat service-account.json | docker login -u _json_key --password-stdin https://gcr.io

# Login with Pulumi
pulumi login --cloud-url gs://cafe-baileys-pulumi-state