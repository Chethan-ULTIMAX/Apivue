import { github } from "./github";
import { gitlab } from "./gitlab";
import { bitbucket } from "./bitbucket";
import { codeberg } from "./codeberg";
import { sourceforge } from "./sourceforge";
import { gitea } from "./gitea";
import { gitee } from "./gitee";
import { azureDevops } from "./azure-devops";
import { awsCodecommit } from "./aws-codecommit";
import { launchpad } from "./launchpad";
import { sourcehut } from "./sourcehut";
import { phabricator } from "./phabricator";
import { pagure } from "./pagure";
import { gerrit } from "./gerrit";
import { savannah } from "./savannah";

export const sourceControlPlatforms = [github, gitlab, bitbucket, codeberg, sourceforge, gitea, gitee, azureDevops, awsCodecommit, launchpad, sourcehut, phabricator, pagure, gerrit, savannah];
