'use client';
import {useEffect,useState} from 'react';
import {Campaign,defaultCampaign,readCampaign} from '@/lib/commerce';
export function useCampaign(){const [campaign,setCampaign]=useState<Campaign>(defaultCampaign);const [now,setNow]=useState(()=>Date.parse('2026-09-28T12:00:00+07:00'));useEffect(()=>{const sync=()=>setCampaign(readCampaign());sync();setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),1000);window.addEventListener('plant-shop-sale-updated',sync);window.addEventListener('storage',sync);return()=>{clearInterval(timer);window.removeEventListener('plant-shop-sale-updated',sync);window.removeEventListener('storage',sync);};},[]);return {campaign,now};}
