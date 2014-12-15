#!/bin/bash

**********************************
* test-driven-infra setup script.
**********************************

# VirtualBox install

# Vagrant install

# Vagrant plugin install
vagrant plugin install vagrant-vbguest

# serverspec install
sudo gem install serverspec --no-ri --no-rdoc

# make directory for management.
mkdir test-driven-infra
cd test-driven-infra

# make directory
