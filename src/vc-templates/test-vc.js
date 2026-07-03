export default JSON.stringify({
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
        "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:uuid:19281fe8-90d2-4eao-a9da-6188898a6c",
    "type": [
        "VerifiableCredential",
        "OpenBadgeCredential"
    ],
    "issuer": {
        "type": [
            "Profile"
        ],
        "name": "The Learned",
        "image": {
            "id": "https://digitalcredentials.github.io/badge-assets/classroom.png",
            "type": "Image",
            "caption": "Learned logo"
        }
    },
    "validFrom": "2025-02-24T00:00:00Z",
    "name": "Parker Pearl",
    "credentialSubject": {
        "type": [
            "AchievementSubject"
        ],
        "achievement": {
            "id": "https://something.org/theProgram",
            
            "type": [
                "Achievement"
            ],
             "image": {
        		"id": "https://digitalcredentials.github.io/badge-assets/brain.png",
        		"type": "Image",
        		"caption": "Certificate logo"
    		},
            "criteria": {
                "narrative": "Objectively told the truth"
            },
            "description": "Successfully completed all modules.",
            "name": "Truth, veracity, candor, and verisimilitude."
        }
    }
})