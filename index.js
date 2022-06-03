const core = require("@actions/core");
const {google} = require("googleapis");

function create(api, tag) {
    const auth = new google.auth.OAuth2();
    auth.apiKey = api;
    const docs = google.docs({version: "v1", auth});
    const tempalte = "1b3cHCDogn2w7vnACPfsmQ58Tq2OzZ_r39rbK7OgULSY";
    const title = `Production Release Testing Script - ${tag}`;
    const request = {
        name: title,
    };

    docs.files.copy(
        {
            fileId: tempalte,
            resource: request,
        },
        (err, _) => {
            if (err) {
                console.error(err);
                core.setFailed(error.message);
            }
        }
    );
}

try {
    core.setSecret("client_secret");
    const tag = core.getInput("release-tag");
    const api_key = core.getInput("google-docs-api-key");
    create(api_key, tag);
} catch (error) {
    core.setFailed(error.message);
}
