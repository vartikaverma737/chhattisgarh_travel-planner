import raipur1 from './raipur1';
import raipur2 from './raipur2';
import raipur3 from './raipur3';
import bilaspur from './bilaspur';
import bastar from './bastar';
import durg from './durg';
import rajnandgaon from './rajnandgaon';
import korba from './korba';
import surguja from './surguja';
import mahasamund from './mahasamund';
import dhamtari from './dhamtari';
import gariyaband from './gariyaband';
import kabirdham from './kabirdham';
import jashpur from './jashpur';
import korea from './korea';
import dantewada from './dantewada';
import kanker from './kanker';
import kondagaon from './kondagaon';
import balod from './balod';
import balodabazar from './balodabazar';
import balrampur from './balrampur';
import bemetara from './bemetara';
import bijapur from './bijapur';
import gpm from './gpm';
import janjgirchampa from './janjgirchampa';
import khairagarh from './khairagarh';
import mcmb from './mcmb';
import mohla from './mohla';
import mungeli from './mungeli';
import narayanpur from './narayanpur';
import raigarh from './raigarh';
import sakti from './sakti';
import sarangarh from './sarangarh';
import sukma from './sukma';
import surajpur from './surajpur';
import SUPPLEMENTAL_LANG from '../supplemental/lang';

export const PLACE_TRANSLATIONS = Object.assign({}, raipur1, raipur2, raipur3, bilaspur, bastar, durg, rajnandgaon, korba, surguja, mahasamund, dhamtari, gariyaband, kabirdham, jashpur, korea, dantewada, kanker, kondagaon, balod, balodabazar, balrampur, bemetara, bijapur, gpm, janjgirchampa, khairagarh, mcmb, mohla, mungeli, narayanpur, raigarh, sakti, sarangarh, sukma, surajpur, SUPPLEMENTAL_LANG);

export function localizePlace(lang, place) {
  if (!place || lang === 'en') return place;
  const t = (PLACE_TRANSLATIONS[place.name] || {})[lang];
  if (!t) return place;
  return {
    ...place,
    shortDesc: t.shortDesc || place.shortDesc,
    fullDesc: t.fullDesc || place.fullDesc,
    tips: t.tips || place.tips,
  };
}