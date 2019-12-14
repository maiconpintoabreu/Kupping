#!/bin/sh
mkdir $HOME/.kube && mkdir $HOME/.ssh && mkdir nginx
gpg --quiet --batch --yes --decrypt --passphrase="${SAFE_KEY}" \
--output charts/templates/configmap.yaml secrets/configmap.yaml.gpg
gpg --quiet --batch --yes --decrypt --passphrase="${SAFE_KEY}" \
--output $HOME/.kube/config secrets/config.gpg

# move this to a kubernetes secret
gpg --quiet --batch --yes --decrypt --passphrase="${SAFE_KEY}" \
--output nginx/fullchain.pem secrets/fullchain.pem.gpg
gpg --quiet --batch --yes --decrypt --passphrase="${SAFE_KEY}" \
--output nginx/privkey.pem secrets/privkey.pem.gpg