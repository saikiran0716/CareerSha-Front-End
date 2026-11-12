import { PageItem } from '../types';
import { IMAGES } from '../constants';

export const TOOLS_COMPARE: PageItem[] = [
    {
        "title": "IIT Bombay vs IIT Delhi",
        "subtitle": "Engineering Clash",
        "tags": [
            "Top 2",
            "Tech"
        ],
        "stats": [
            {
                "label": "Metric",
                "value": "Pkg"
            },
            {
                "label": "Winner",
                "value": "Tie"
            }
        ],
        "image": IMAGES.eng,
        "link": "#"
    },
    {
        "title": "IIM A vs IIM B vs IIM C",
        "subtitle": "The Holy Trinity",
        "tags": [
            "MBA",
            "Placement"
        ],
        "stats": [
            {
                "label": "Metric",
                "value": "ROI"
            },
            {
                "label": "Choice",
                "value": "Hard"
            }
        ],
        "image": IMAGES.mba,
        "link": "#"
    },
    {
        "title": "NIT Trichy vs NIT Warangal",
        "subtitle": "Top NITs",
        "tags": [
            "South",
            "Engg"
        ],
        "stats": [
            {
                "label": "Metric",
                "value": "Campus"
            },
            {
                "label": "Pref",
                "value": "Trichy"
            }
        ],
        "image": IMAGES.eng,
        "link": "#"
    }
];
