import { addCollection } from '@iconify/react';

// Pure JSON sets ko import karein
import fluentMdl2Data from '@iconify-json/fluent-mdl2/icons.json';
import ionData from '@iconify-json/ion/icons.json';
import simpleIconsData from '@iconify-json/simple-icons/icons.json';
import fontistoData from '@iconify-json/fontisto/icons.json';
import tablerData from '@iconify-json/tabler/icons.json';
import materialSymbolsData from '@iconify-json/material-symbols/icons.json';
import mingcuteData from '@iconify-json/mingcute/icons.json';
import tdesignData from '@iconify-json/tdesign/icons.json';
import mdiData from '@iconify-json/mdi/icons.json';
import rivetIconsData from '@iconify-json/rivet-icons/icons.json';
import basilData from '@iconify-json/basil/icons.json';
import spinnersData from '@iconify-json/svg-spinners/icons.json';
import formkitData from '@iconify-json/formkit/icons.json';
import riData from '@iconify-json/ri/icons.json';
import lucideData from '@iconify-json/lucide/icons.json';

// In sabko register kar dein taaki ye offline available ho jayein
try {
    addCollection(fluentMdl2Data);
    addCollection(ionData);
    addCollection(simpleIconsData);
    addCollection(fontistoData);
    addCollection(tablerData);
    addCollection(materialSymbolsData);
    addCollection(mingcuteData);
    addCollection(tdesignData);
    addCollection(mdiData);
    addCollection(rivetIconsData);
    addCollection(basilData);
    addCollection(spinnersData);
    addCollection(formkitData);
    addCollection(riData);
    addCollection(lucideData);
} catch (error) {
    console.error("Icon registration failed:", error.message);
}