import { PageItem } from '../types';
import { IMAGES } from '../constants';

export const TOOLS_PREDICTOR: PageItem[] = [
    {
        "title": "JEE Main Predictor",
        "subtitle": "Engineering",
        "tags": [
            "B.Tech",
            "NITs"
        ],
        "stats": [
            {
                "label": "Accuracy",
                "value": "95%"
            },
            {
                "label": "Users",
                "value": "1M+"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=predictor&exam=jee-main"
    },
    {
        "title": "NEET Predictor",
        "subtitle": "Medical",
        "tags": [
            "MBBS",
            "BDS"
        ],
        "stats": [
            {
                "label": "Accuracy",
                "value": "98%"
            },
            {
                "label": "Data",
                "value": "2024"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=predictor&exam=neet"
    },
    {
        "title": "CAT Percentile Predictor",
        "subtitle": "MBA",
        "tags": [
            "IIM Calls",
            "MBA"
        ],
        "stats": [
            {
                "label": "Based On",
                "value": "Slot"
            },
            {
                "label": "Users",
                "value": "500K+"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=predictor&exam=cat"
    },
    {
        "title": "GATE Predictor",
        "subtitle": "M.Tech/PSU",
        "tags": [
            "PG",
            "Jobs"
        ],
        "stats": [
            {
                "label": "Accuracy",
                "value": "90%"
            },
            {
                "label": "Branch",
                "value": "All"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=predictor&exam=gate"
    }
];
