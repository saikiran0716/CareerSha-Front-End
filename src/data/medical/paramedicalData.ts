import { PageItem } from '../types';
import { IMAGES } from '../constants';

export const ALL_PARAMEDICAL: PageItem[] = [
    {
        "title": "AIIMS Paramedical",
        "subtitle": "New Delhi",
        "tags": [
            "Public",
            "Top Tier"
        ],
        "stats": [
            {
                "label": "Course",
                "value": "Optometry"
            },
            {
                "label": "Fees",
                "value": "₹5K"
            }
        ],
        "image": IMAGES.med,
        "link": "https://www.aiims.edu/"
    },
    {
        "title": "JIPMER Allied Health",
        "subtitle": "Puducherry",
        "tags": [
            "Public",
            "Institute"
        ],
        "stats": [
            {
                "label": "Course",
                "value": "MLT"
            },
            {
                "label": "Fees",
                "value": "₹12K"
            }
        ],
        "image": IMAGES.med,
        "link": "https://jipmer.edu.in/"
    },
    {
        "title": "CMC Vellore Allied",
        "subtitle": "Vellore",
        "tags": [
            "Private",
            "Historic"
        ],
        "stats": [
            {
                "label": "Course",
                "value": "Physio"
            },
            {
                "label": "Fees",
                "value": "₹1L"
            }
        ],
        "image": IMAGES.med,
        "link": "https://www.cmch-vellore.edu/"
    },
    {
        "title": "Manipal Allied Health",
        "subtitle": "Manipal",
        "tags": [
            "Private",
            "Global"
        ],
        "stats": [
            {
                "label": "Course",
                "value": "Radio"
            },
            {
                "label": "Fees",
                "value": "₹4L"
            }
        ],
        "image": IMAGES.med,
        "link": "https://manipal.edu/soahs-manipal.html"
    },
    {
        "title": "NIMS Hyderabad",
        "subtitle": "Hyderabad",
        "tags": [
            "State",
            "Hospital"
        ],
        "stats": [
            {
                "label": "Course",
                "value": "PT/OT"
            },
            {
                "label": "Fees",
                "value": "₹50K"
            }
        ],
        "image": IMAGES.med,
        "link": "https://nims.edu.in/"
    }
];
