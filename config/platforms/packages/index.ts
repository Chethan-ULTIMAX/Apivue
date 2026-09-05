import { npm } from "./npm";
import { pypi } from "./pypi";
import { mavenCentral } from "./maven-central";
import { nuget } from "./nuget";
import { rubygems } from "./rubygems";
import { crates } from "./crates";
import { packagist } from "./packagist";
import { goPackages } from "./go-packages";
import { dockerHub } from "./docker-hub";
import { homebrew } from "./homebrew";
import { cocoapods } from "./cocoapods";
import { gradlePluginPortal } from "./gradle-plugin-portal";
import { terraformRegistry } from "./terraform-registry";
import { helm } from "./helm";
import { conda } from "./conda";

export const packagesPlatforms = [npm, pypi, mavenCentral, nuget, rubygems, crates, packagist, goPackages, dockerHub, homebrew, cocoapods, gradlePluginPortal, terraformRegistry, helm, conda];
