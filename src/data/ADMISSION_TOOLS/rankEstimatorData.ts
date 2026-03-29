import { PageItem } from '../types';
import { IMAGES } from '../constants';

export const TOOLS_RANK: PageItem[] = [
    {
        "title": "JEE Rank Estimator",
        "subtitle": "Based on Marks",
        "tags": [
            "Engineering",
            "Percentile"
        ],
        "stats": [
            {
                "label": "Input",
                "value": "Score"
            },
            {
                "label": "Output",
                "value": "Rank"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=rank&exam=jee-main"
    },
    {
        "title": "NEET Rank Estimator",
        "subtitle": "Based on Score",
        "tags": [
            "Medical",
            "AIR"
        ],
        "stats": [
            {
                "label": "Input",
                "value": "720"
            },
            {
                "label": "Year",
                "value": "2026"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=rank&exam=neet"
    },
    {
        "title": "KCET Rank Estimator",
        "subtitle": "Karnataka",
        "tags": [
            "State",
            "Engg/Med"
        ],
        "stats": [
            {
                "label": "Region",
                "value": "KA"
            },
            {
                "label": "Quota",
                "value": "Rural"
            }
        ],
        "image": IMAGES.exam,
        "link": "/?tool=rank&exam=kcet"
    }
];
